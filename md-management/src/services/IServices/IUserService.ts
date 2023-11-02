import { Result } from '../../core/logic/Result';
import { IUserDTO } from '../../dto/IUserDTO';

export default interface IUserService {
  signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  signIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  findUserById(userId: string): Promise<Result<IUserDTO>>;
  findByEmail(email: string): Promise<Result<IUserDTO>>;
}
