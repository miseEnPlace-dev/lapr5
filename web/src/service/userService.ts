import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { User } from "@/model/User";

import { HttpService } from "./IService/HttpService";
import { IUserService, UserSession } from "./IService/IUserService";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async register(user: User): Promise<UserSession> {
    const res = await this.http.post("/users/signup", {
      ...user,
      role: "user",
    });

    return res.data as UserSession;
  }
}
