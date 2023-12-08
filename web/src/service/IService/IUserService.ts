import { Session } from "@/model/Session";
import { User } from "@/model/User";

export interface UserSession {
  user: User;
  token: string;
}

export interface IUserService {
  getCurrentUser(): Promise<User>;
  register(user: Omit<User, "role">): Promise<UserSession>;
  deleteUser(): Promise<void>;
  updateUser(user: Partial<User>): Promise<User>;
}
