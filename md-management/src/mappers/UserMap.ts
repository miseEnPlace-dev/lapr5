import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';

import { IUserDTO } from '../dto/IUserDTO';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { User } from '../domain/user/user';

import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';

import { IUserPersistence } from '@/dataschema/IUserPersistence';
import { PhoneNumber } from '@/domain/user/phoneNumber';
import RoleRepo from '../repos/roleRepo';

export class UserMap extends Mapper<User> {
  public static toDTO(user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: '',
      role: user.role.id.toString()
    } as IUserDTO;
  }

  public static async toDomain(raw: IUserPersistence): Promise<User | null> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    const phoneNumberOrError = PhoneNumber.create(raw.phoneNumber);
    const repo = Container.get(RoleRepo);
    const role = await repo.findByDomainId(raw.role);
    if (!role) throw new Error('Role not found');

    const userOrError = User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        phoneNumber: phoneNumberOrError.getValue(),
        role: role
      },
      new UniqueEntityID(raw._id)
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(user: User) {
    const a = {
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.id.toValue(),
      phoneNumber: user.phoneNumber.value
    };
    return a;
  }
}
