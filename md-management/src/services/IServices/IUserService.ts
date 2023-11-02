import { Result } from '../../core/logic/Result';
import { IUserDTO } from '../../dto/IUserDTO';

export default interface IUserService {
  signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  getUserById(userId: string): Promise<Result<IUserDTO>>;
}
