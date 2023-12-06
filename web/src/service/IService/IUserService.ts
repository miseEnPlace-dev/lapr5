import { User } from "@/model/User";

export interface UserSession {
  user: User;
  token: string;
}

export interface IUserService {
  register(user: Omit<User, "role">): Promise<UserSession>;
  deleteUser(): Promise<void>;
}
