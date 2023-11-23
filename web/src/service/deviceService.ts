import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { Device } from "@/model/Device";

import { HttpService } from "./IService/HttpService";
import { IDeviceService } from "./IService/IDeviceService";

@injectable()
export class DeviceService implements IDeviceService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getDevicesRobots(
    filter?: "task" | "model",
    value?: string
  ): Promise<Device[]> {
    let response;
    console.log("filter: " + filter);
    console.log("value: " + value);

    if (filter)
      response = await this.http.get<Device[]>(
        "/devices/robots?filter=" + filter + "&value=" + value
      );
    else response = await this.http.get<Device[]>("/devices/robots");

    const data = response.data;
    return data;
  }

  async createDevice(device: Device): Promise<Device> {
    const response = await this.http
      .post<Device>("/devices", device)
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async getDevice(deviceCode: string): Promise<Device> {
    const response = await this.http
      .get<Device>(`/devices/${deviceCode}`)
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async inhibitDevice(deviceCode: string): Promise<Device> {
    const response = await this.http
      .patch<Device>(`/devices/${deviceCode}`, {})
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;

    return data;
  }
}
