import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";

import { DeviceModel } from "../model/DeviceModel";
import { HttpService } from "./IService/HttpService";
import { IDeviceModelService } from "./IService/IDeviceModelService";

@injectable()
export class DeviceModelService implements IDeviceModelService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getDeviceModels(): Promise<DeviceModel[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<DeviceModel[]>("/device-models", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  }

  async getDeviceModelWithCode(code: string): Promise<DeviceModel> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<DeviceModel>(
      `/device-models/${code}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    return data;
  }

  async createDeviceModel(building: DeviceModel): Promise<DeviceModel> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<DeviceModel>("/device-models", building, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .put<DeviceModel>(`/device-models/${deviceModel.code}`, deviceModel, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
}
