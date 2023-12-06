import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";

import { DeviceModel } from "../model/DeviceModel";
import { HttpService } from "./IService/HttpService";
import { IDeviceModelService } from "./IService/IDeviceModelService";
import { IPaginationDTO } from "@/dto/IPaginationDTO";

@injectable()
export class DeviceModelService implements IDeviceModelService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) { }

  async getDeviceModels(page: number = 0, limit: number = 2): Promise<IPaginationDTO<DeviceModel>> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const params = {} as { [key: string]: string };

    params["limit"] = limit.toString();
    params["page"] = page.toString();

    const response = await this.http.get<IPaginationDTO<DeviceModel>>("/device-models", {
      params,
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
