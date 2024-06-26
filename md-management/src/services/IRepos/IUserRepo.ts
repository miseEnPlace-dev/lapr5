import { Repo } from '../../core/infra/Repo';
import { User } from '../../domain/user/user';
import { UserEmail } from '../../domain/user/userEmail';

export default interface IUserRepo extends Repo<User> {
  save(user: User): Promise<User>;
  findByEmail(email: UserEmail | string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  count(): Promise<number>;
  countActive(): Promise<number>;
  delete(id: string): Promise<void>;
  findAll(page: number, limit: number): Promise<User[]>;
  findByRole(role: string): Promise<User[]>;
  findPending(): Promise<User[]>;
  findActive(page: number, limit: number): Promise<User[]>;
}
