import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { DeviceModel } from "../model/DeviceModel";
import { HttpService } from "./IService/HttpService";
import { IDeviceModelService } from "./IService/IDeviceModelService";

@injectable()
export class DeviceModelService implements IDeviceModelService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getDeviceModels(): Promise<DeviceModel[]> {
    const response = await this.http.get<DeviceModel[]>("/device-models");
    const data = response.data;
    return data;
  }

  async getDeviceModelWithCode(code: string): Promise<DeviceModel> {
    const response = await this.http.get<DeviceModel>(`/device-models/${code}`);
    const data = response.data;
    return data;
  }

  async createDeviceModel(building: DeviceModel): Promise<DeviceModel> {
    const response = await this.http
      .post<DeviceModel>("/device-models", building)
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
}
