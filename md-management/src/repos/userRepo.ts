import { injectable } from 'inversify';

import { User } from '@/domain/user/user';
import { UserEmail } from '@/domain/user/userEmail';
import { UserId } from '@/domain/user/userId';
import { UserMapper } from '@/mappers/UserMapper';
import userSchema from '@/persistence/schemas/userSchema';
import IUserRepo from '@/services/IRepos/IUserRepo';

@injectable()
export default class UserRepo implements IUserRepo {
  constructor() {}

  public async exists(user: User): Promise<boolean> {
    const query = { domainId: user.id };
    const userDocument = await userSchema.findOne(query);

    return !!userDocument;
  }

  public async save(user: User): Promise<User> {
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
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail(email: UserEmail | string): Promise<User | null> {
    const emailVal = email instanceof UserEmail ? (<UserEmail>email).value : email;
    const query = { email: emailVal };
    const userRecord = await userSchema.findOne(query);

    if (userRecord !== null) return UserMapper.toDomain(userRecord);

    return null;
  }

  public async findById(userId: UserId | string): Promise<User | null> {
    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX };
    const userRecord = await userSchema.findOne(query);

    if (userRecord !== null) return UserMapper.toDomain(userRecord);

    return null;
  }
}
