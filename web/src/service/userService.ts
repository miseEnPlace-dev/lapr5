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

  async deleteUser(): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    await this.http.delete("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
