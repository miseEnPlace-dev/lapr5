import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { Device } from "@/model/Device";

import { HttpService } from "./IService/HttpService";
import { IDeviceService } from "./IService/IDeviceService";

@injectable()
export class DeviceService implements IDeviceService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getDevicesRobots(
    filter?: "task" | "model",
    value?: string
  ): Promise<Device[]> {
    let response;

    const token = this.localStorage.getItem(localStorageConfig.token);

    if (filter)
      response = await this.http.get<Device[]>(
        "/devices/robots?filter=" + filter + "&value=" + value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    else
      response = await this.http.get<Device[]>("/devices/robots", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    const data = response.data;
    return data;
  }

  async createDevice(device: Device): Promise<Device> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Device>("/devices", device, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async getDevice(deviceCode: string): Promise<Device> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .get<Device>(`/devices/${deviceCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async inhibitDevice(deviceCode: string): Promise<Device> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .patch<Device>(
        `/devices/${deviceCode}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;

    return data;
  }
}
