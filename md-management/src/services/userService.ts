import config from '@/config.mjs';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { IUserDTO } from '../dto/IUserDTO';
import { UserMapper } from '../mappers/UserMapper';
import IUserService from './IServices/IUserService';

import IRoleRepo from './IRepos/IRoleRepo';
import IUserRepo from './IRepos/IUserRepo';

import { User } from '../domain/user/user';
import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';

import { Role } from '../domain/role/role';

import { PhoneNumber } from '@/domain/user/phoneNumber';
import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';
import { Result } from '../core/logic/Result';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.userRepo) private userRepo: IUserRepo,
    @inject(TYPES.roleRepo) private roleRepo: IRoleRepo
  ) {}

  public async signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found)
        return Result.fail<{ userDTO: IUserDTO; token: string }>(
          'User already exists with email=' + userDTO.email
        );

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });

      const password = UserPassword.create({
        value: hashedPassword,
        hashed: true
      }).getValue();
      const emailOrError = UserEmail.create(userDTO.email);
      if (emailOrError.isFailure)
        return Result.fail<{ userDTO: IUserDTO; token: string }>(emailOrError.error);

      const phoneNumberOrError = PhoneNumber.create(userDTO.phoneNumber);
      if (phoneNumberOrError.isFailure)
        return Result.fail<{ userDTO: IUserDTO; token: string }>(phoneNumberOrError.error);

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure)
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);

      const role = roleOrError.getValue();

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        phoneNumber: phoneNumberOrError.getValue(),
        email: emailOrError.getValue(),
        role,
        password
      });

      if (userOrError.isFailure) throw Result.fail<IUserDTO>(userOrError.errorValue());

      const userResult = userOrError.getValue();

      const token = this.generateToken(userResult);

      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMapper.toDTO(userResult);
      return Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: userDTOResult,
        token: token
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new Error('User not registered');

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      const token = this.generateToken(user) as string;

      const userDTO = UserMapper.toDTO(user) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTO, token: token });
    }

    throw new Error('Invalid Password');
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
    const role = user.role.name.value;

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

  async findUserById(userId: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findById(userId);
    if (!user) return Result.fail<IUserDTO>('User not found');

    const userDTO = UserMapper.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  async findByEmail(email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return Result.fail<IUserDTO>('User not found');

    const userDTO = UserMapper.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  private async getRole(name: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByName(name);
    const found = !!role;

    if (found) return Result.ok<Role>(role);
    return Result.fail<Role>("Couldn't find role by name=" + name);
  }
}
