import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { Result } from '../../core/logic/Result';
import { IUserDTO } from '../../dto/IUserDTO';
import { IGoogleUserInfoDTO } from '@/dto/IGoogleUserInfoDTO';

export default interface IUserService {
  signUp(userDTO: Omit<IUserDTO, 'id'>): Promise<Result<{ user: IUserDTO; token: string }>>;
  signIn(email: string, password?: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  findUserById(userId: string): Promise<Result<IUserDTO>>;
  findByEmail(email: string): Promise<Result<IUserDTO>>;
  deleteUser(userId: string): Promise<Result<void>>;
  updateUser(user: IUserDTO, email: string): Promise<Result<IUserDTO>>;
  activateUser(userId: string): Promise<Result<void>>;
  rejectUser(userId: string): Promise<Result<void>>;
  getUsersWithRole(role: string): Promise<Result<IUserDTO[]>>;
  getAllUsers(page?: number, limit?: number): Promise<Result<IPaginationDTO<IUserDTO>>>;
  getPendingUsers(): Promise<Result<IUserDTO[]>>;
  userExists(email: string): Promise<Result<boolean>>;
  getGoogleUserInfo(credential: string): Promise<IGoogleUserInfoDTO>;
}
