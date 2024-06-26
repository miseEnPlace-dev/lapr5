import { Mapper } from '../core/infra/Mapper';

import { IUserDTO } from '../dto/IUserDTO';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { User } from '../domain/user/user';

import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';

import { IUserPersistence } from '@/dataschema/IUserPersistence';
import { PhoneNumber } from '@/domain/user/phoneNumber';
import { UserNif } from '@/domain/user/userNif';
import { UserState } from '@/domain/user/userState';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IRoleRepo from '@/services/IRepos/IRoleRepo';

export class UserMapper extends Mapper<User> {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      phoneNumber: user.phoneNumber.value,
      nif: user.nif?.value,
      password: '',
      role: user.role.name.value,
      state: user.state ? user.state.value : 'pending'
    };
  }

  public static async toDomain(raw: IUserPersistence): Promise<User | null> {
    const userEmailOrError = UserEmail.create(raw.email);
    if (userEmailOrError.isFailure) throw new Error(userEmailOrError.errorValue());

    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    if (userPasswordOrError.isFailure) throw new Error(userPasswordOrError.errorValue());

    const phoneNumberOrError = PhoneNumber.create(raw.phoneNumber);
    if (phoneNumberOrError.isFailure) throw new Error(phoneNumberOrError.errorValue());

    const nifOrError = raw.nif ? UserNif.create(raw.nif) : undefined;
    if (nifOrError?.isFailure) throw new Error(nifOrError.errorValue());

    const roleRepo = container.get<IRoleRepo>(TYPES.roleRepo);
    const role = await roleRepo.findByName(raw.role);
    if (!role) throw new Error('Role not found');

    const userOrError = User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        phoneNumber: phoneNumberOrError.getValue(),
        nif: nifOrError?.getValue(),
        role,
        state: UserState.create(raw.state)
      },
      new UniqueEntityID(raw.domainId)
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(user: User): Omit<IUserPersistence, 'salt'> {
    return {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      nif: user.nif?.value,
      role: user.role.name.value,
      phoneNumber: user.phoneNumber.value,
      state: user.state ? user.state.value : 'pending'
    };
  }
}
