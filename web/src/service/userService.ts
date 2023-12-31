import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { GoogleUserInfo } from "@/model/GoogleUserInfo";
import { Role } from "@/model/Role";
import { User } from "@/model/User";

import { HttpService } from "./IService/HttpService";
import { IUserService, UserSession } from "./IService/IUserService";

import axios from "axios";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async register(user: User): Promise<UserSession> {
    const res = await this.http.post<UserSession>("/users/signup", {
      ...user,
    });

    return res.data as UserSession;
  }

  async getCurrentUser(): Promise<User> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    const res = await this.http.get<User>("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
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

  async updateUser(user: Partial<User>): Promise<User> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    const res = await this.http.put<User>("/users", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getAllUsers(
    page: number = 0,
    limit: number = 2
  ): Promise<IPaginationDTO<User>> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const params = {} as { [key: string]: string };

    params["limit"] = limit.toString();
    params["page"] = page.toString();

    const res = await this.http.get<IPaginationDTO<User>>("/users", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getAllRoles(): Promise<Role[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);
    const res = await this.http.get("/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as Role[];
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

  async checkIfUserExistsByGoogleCredential(
    credential: string
  ): Promise<boolean> {
    const email = await this.getGoogleUserInfo(credential).then(
      (info) => info.email
    );
    const exists = await this.http.get<{
      exists: boolean;
    }>(`/users/${email}`);

    return exists.data?.exists;
  }

  async getGoogleUserInfo(credential: string): Promise<GoogleUserInfo> {
    const res = await axios.get<GoogleUserInfo>(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" + credential
    );

    return res.data;
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
