import { Role } from "@/model/Role";
import { Session } from "@/model/Session";
import { User } from "@/model/User";

export interface UserSession {
  user: User;
  token: string;
}

export interface IUserService {
  getCurrentUser(): Promise<User>;
  deleteUser(): Promise<void>;
  updateUser(user: Partial<User>): Promise<User>;
  register(user: Omit<User, "role" | "id">): Promise<UserSession>;
  getAllUsers(): Promise<User[]>;
  getAllRoles(): Promise<Role[]>;
  getRequests(): Promise<User[]>;
  acceptRequest(id: string): Promise<void>;
  rejectRequest(id: string): Promise<void>;
}
