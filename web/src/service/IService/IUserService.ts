import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Role } from "@/model/Role";
import { User } from "@/model/User";

export interface UserSession {
  user: User;
  token: string;
}

export interface IUserService {
  getCurrentUser(): Promise<User>;
  deleteUser(): Promise<void>;
  updateUser(user: Partial<User>): Promise<User>;
  register(user: Omit<User, "id">): Promise<UserSession>;
  getAllUsers(page?: number, limit?: number): Promise<IPaginationDTO<User>>;
  getAllRoles(): Promise<Role[]>;
  getRequests(): Promise<User[]>;
  acceptRequest(id: string): Promise<void>;
  rejectRequest(id: string): Promise<void>;
}
