import { User } from "@/model/User";

export interface UserSession {
  user: User;
  token: string;
}

export interface IUserService {
  register(user: Omit<User, "role">): Promise<UserSession>;
  deleteUser(): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getRequests(): Promise<User[]>;
  acceptRequest(id: string): Promise<void>;
  rejectRequest(id: string): Promise<void>;
}
