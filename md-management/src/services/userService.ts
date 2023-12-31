import config from '@/config';
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

import { defaultRoles } from '@/domain/role/defaultRoles';
import { PhoneNumber } from '@/domain/user/phoneNumber';
import { UserNif } from '@/domain/user/userNif';
import { UserState } from '@/domain/user/userState';
import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';
import { Result } from '../core/logic/Result';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.userRepo) private userRepo: IUserRepo,
    @inject(TYPES.roleRepo) private roleRepo: IRoleRepo
  ) {}

  async getAllUsers(
    page: number = 1,
    limit: number = 3
  ): Promise<Result<IPaginationDTO<IUserDTO>>> {
    const users = await this.userRepo.findActive(page - 1, limit);
    const usersDTO = users.map(user => UserMapper.toDTO(user) as IUserDTO);
    const total = await this.userRepo.countActive();

    const result: IPaginationDTO<IUserDTO> = {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      data: usersDTO
    };

    return Result.ok<IPaginationDTO<IUserDTO>>(result);
  }

  async getPendingUsers(): Promise<Result<IUserDTO[]>> {
    const users = await this.userRepo.findPending();
    const usersDTO = users.map(user => UserMapper.toDTO(user) as IUserDTO);
    return Result.ok<IUserDTO[]>(usersDTO);
  }

  async getUsersWithRole(role: string): Promise<Result<IUserDTO[]>> {
    const users = await this.userRepo.findByRole(role);
    const usersDTO = users.map(user => UserMapper.toDTO(user) as IUserDTO);
    return Result.ok<IUserDTO[]>(usersDTO);
  }

  async rejectUser(userId: string): Promise<Result<void>> {
    const user = await this.userRepo.findById(userId);
    if (!user) return Result.fail<void>('User not found');

    user.state = UserState.Rejected;
    await this.userRepo.save(user);
    return Result.ok<void>();
  }

  async signUp(userDTO: Omit<IUserDTO, 'id'>): Promise<Result<{ user: IUserDTO; token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found)
        return Result.fail<{ user: IUserDTO; token: string }>(
          'User already exists with email: ' + userDTO.email
        );

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password ? userDTO.password : '', { salt });

      const passwordOrError = UserPassword.create({
        value: hashedPassword,
        hashed: true
      });
      if (passwordOrError.isFailure)
        return Result.fail<{ user: IUserDTO; token: string }>(passwordOrError.error);

      const emailOrError = UserEmail.create(userDTO.email);
      if (emailOrError.isFailure)
        return Result.fail<{ user: IUserDTO; token: string }>(emailOrError.error);

      const phoneNumberOrError = PhoneNumber.create(userDTO.phoneNumber);
      if (phoneNumberOrError.isFailure)
        return Result.fail<{ user: IUserDTO; token: string }>(phoneNumberOrError.error);

      const nifOrError = userDTO.nif ? UserNif.create(userDTO.nif) : undefined;
      if (nifOrError?.isFailure) throw new Error(nifOrError.errorValue());

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure)
        return Result.fail<{ user: IUserDTO; token: string }>(roleOrError.error);

      const role = roleOrError.getValue();

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        phoneNumber: phoneNumberOrError.getValue(),
        email: emailOrError.getValue(),
        role,
        nif: nifOrError?.getValue(),
        password: passwordOrError.getValue(),
        state: role.title.value === defaultRoles.user.title ? UserState.Pending : UserState.Active
      });

      if (userOrError.isFailure) throw Result.fail<IUserDTO>(userOrError.errorValue());

      const userResult = userOrError.getValue();

      const token = this.generateToken(userResult);

      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMapper.toDTO(userResult);
      return Result.ok<{ user: IUserDTO; token: string }>({
        user: userDTOResult,
        token: token
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async signIn(
    email: string,
    password: string
  ): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new Error('User not registered');

    if (user.state.value === UserState.Pending.value) throw new Error('User not activated');
    if (user.state.value === UserState.Rejected.value) throw new Error('User not allowed');

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
     * Beware that the metadata is  and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.name.value;
    const phoneNumber = user.phoneNumber.props.value;
    const nif = user.nif?.value;

    return jwt.sign(
      {
        id,
        email, // We are gonna use this in the middleware 'isAuth'
        role,
        firstName,
        lastName,
        phoneNumber,
        nif,
        exp: exp.getTime() / 1000
      },
      config.jwtSecret
    );
  }

  async activateUser(userId: string): Promise<Result<void>> {
    const user = await this.userRepo.findById(userId);
    if (!user) return Result.fail<void>('User not found');

    user.state = UserState.Active;
    await this.userRepo.save(user);
    return Result.ok<void>();
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

  async deleteUser(userId: string): Promise<Result<void>> {
    const user = await this.userRepo.findById(userId);
    if (!user) return Result.fail<void>('User not found');

    await this.userRepo.delete(userId);
    return Result.ok<void>();
  }

  async updateUser(userDTO: IUserDTO, email: string): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (!user) return Result.fail<IUserDTO>('User not found');

      if (userDTO.password) {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userDTO.password, {
          salt
        });

        const passwordOrError = UserPassword.create({
          value: hashedPassword,
          hashed: true
        });
        if (passwordOrError.isFailure) return Result.fail<IUserDTO>(passwordOrError.error);

        user.password = passwordOrError.getValue();
      }

      const phoneNumberOrError = PhoneNumber.create(userDTO.phoneNumber);
      if (phoneNumberOrError.isFailure) return Result.fail<IUserDTO>(phoneNumberOrError.error);

      const nifOrError = userDTO.nif ? UserNif.create(userDTO.nif) : undefined;
      if (nifOrError?.isFailure) throw new Error(nifOrError.errorValue());

      user.phoneNumber = phoneNumberOrError.getValue();
      user.firstName = userDTO.firstName;
      user.lastName = userDTO.lastName;
      user.nif = nifOrError?.getValue();

      await this.userRepo.save(user);

      const userDTOResult = UserMapper.toDTO(user);
      return Result.ok<IUserDTO>(userDTOResult);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private async getRole(name: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByName(name);
    const found = !!role;

    if (found) return Result.ok<Role>(role);
    return Result.fail<Role>("Couldn't find role by name=" + name);
  }
}
