import "reflect-metadata";

import { inject, injectable } from "inversify";
import { capitalize } from "lodash";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";

import { HttpService } from "./IService/HttpService";
import { ITaskService } from "./IService/ITaskService";
import { Task } from "@/model/Task";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) { }


  async createTask(requestId: string, deviceId: string): Promise<Task> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.post<Task>(
      "/tasks",
      {
        requestId,
        deviceId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    return data;
  }

  async getTasks(): Promise<Task[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Task[]>(
      "/tasks",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    return data;
  }

}
