import { Result } from '../../core/logic/Result';
import { IUserDTO } from '../../dto/IUserDTO';

export default interface IUserService {
  signUp(userDTO: Omit<IUserDTO, 'id'>): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  signIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  findUserById(userId: string): Promise<Result<IUserDTO>>;
  findByEmail(email: string): Promise<Result<IUserDTO>>;
  deleteUser(userId: string): Promise<Result<void>>;
  updateUser(user: IUserDTO, email: string): Promise<Result<IUserDTO>>;
  activateUser(userId: string): Promise<Result<void>>;
  getUsersWithRole(role: string): Promise<Result<IUserDTO[]>>;
  getAllUsers(): Promise<Result<IUserDTO[]>>;
}
