import { injectable } from 'inversify';

import { User } from '@/domain/user/user';
import { UserEmail } from '@/domain/user/userEmail';
import { UserMapper } from '@/mappers/UserMapper';
import userSchema from '@/persistence/schemas/userSchema';
import IUserRepo from '@/services/IRepos/IUserRepo';

@injectable()
export default class UserRepo implements IUserRepo {
  constructor() {}

  async findAll(): Promise<User[]> {
    const userRecords = await userSchema.find();

    const users = [];
    for (const userRecord of userRecords) {
      const user = await UserMapper.toDomain(userRecord);
      if (user) users.push(user);
    }

    return users;
  }

  async findActive(): Promise<User[]> {
    const query = { state: 'active' };
    const userRecords = await userSchema.find(query);

    const users = [];
    for (const userRecord of userRecords) {
      const user = await UserMapper.toDomain(userRecord);
      if (user) users.push(user);
    }

    return users;
  }

  async findPending(): Promise<User[]> {
    const query = { state: 'pending' };
    const userRecords = await userSchema.find(query);

    const users = [];
    for (const userRecord of userRecords) {
      const user = await UserMapper.toDomain(userRecord);
      if (user) users.push(user);
    }

    return users;
  }

  async findByRole(role: string): Promise<User[]> {
    const query = { role };
    const userRecords = await userSchema.find(query);

    const users = [];
    for (const userRecord of userRecords) {
      const user = await UserMapper.toDomain(userRecord);
      if (user) users.push(user);
    }

    return users;
  }

  async exists(user: User): Promise<boolean> {
    const query = { domainId: user.id };
    const userDocument = await userSchema.findOne(query);

    return !!userDocument;
  }

  async count(): Promise<number> {
    return await userSchema.count();
  }

  async save(user: User): Promise<User> {
    const query = { domainId: user.id };

    const userDocument = await userSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawUser = UserMapper.toPersistence(user);

        const userCreated = await userSchema.create(rawUser);

        const domainUser = await UserMapper.toDomain(userCreated);

        if (!domainUser) throw new Error('User not created');

        return domainUser;
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        userDocument.email = user.email.value;
        userDocument.phoneNumber = user.phoneNumber.value;
        userDocument.state = user.state.value;
        userDocument.nif = user.nif?.value;
        userDocument.password = user.password.value;

        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: UserEmail | string): Promise<User | null> {
    const emailVal = email instanceof UserEmail ? (<UserEmail>email).value : email;
    const query = { email: emailVal };
    const userRecord = await userSchema.findOne(query);

    if (userRecord !== null) return UserMapper.toDomain(userRecord);

    return null;
  }

  async findById(userId: string): Promise<User | null> {
    const query = { domainId: userId };
    const userRecord = await userSchema.findOne(query);

    if (userRecord !== null) return UserMapper.toDomain(userRecord);

    return null;
  }

  async delete(id: string): Promise<void> {
    const query = { domainId: id };

    const result = await userSchema.deleteOne(query);
    if (!result) throw new Error('User not deleted');
  }
}
