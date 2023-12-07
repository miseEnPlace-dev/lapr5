import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { User } from "@/model/User";

import { HttpService } from "./IService/HttpService";
import { IUserService, UserSession } from "./IService/IUserService";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async register(user: User): Promise<UserSession> {
    const res = await this.http.post("/users/signup", {
      ...user,
      role: "user",
    });

    return res.data as UserSession;
  }

  async getRequests(): Promise<User[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    const requests = await this.http.get<User[]>("/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return requests.data;
  }

  async deleteUser(): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    await this.http.delete("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    const res = await this.http.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as User[];
  }

  async acceptRequest(id: string): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    await this.http.patch(
      `/users/${id}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async rejectRequest(id: string): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    await this.http.patch(
      `/users/${id}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
