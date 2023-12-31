import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Sequence } from "@/model/Sequence";
import { Task } from "@/model/Task";

import { HttpService } from "./IService/HttpService";
import { ITaskService } from "./IService/ITaskService";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async createTask(requestId: string, deviceId: string): Promise<Task> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.post<Task>(
      "/tasks",
      {
        requestId,
        deviceId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = response.data;
    return data;
  }

  async getTasks(): Promise<Task[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<IPaginationDTO<Task>>("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data.data;
    return data;
  }

  async finishTask(id: string): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    await this.http.patch(`/tasks/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getSequence(): Promise<Sequence> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const res = await this.http.get<Sequence>("/tasks/sequence", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
}
