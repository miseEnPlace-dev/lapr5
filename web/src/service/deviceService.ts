import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { HttpService } from "./IService/HttpService";
import { IDeviceService } from "./IService/IDeviceService";
import { Device } from "@/model/Device";

@injectable()
export class DeviceService implements IDeviceService {
  constructor(@inject(TYPES.api) private http: HttpService) { }

  async getDevicesRobots(filters?: string[], values?: string[]): Promise<Device[]> {
    let response;

    if (!filters || !values)
      response = await this.http.get<Device[]>("/devices/robots");
    else if (filters.length === 1 && filters[0] === "task")
      response = await this.http.get<Device[]>("/devices/robots?filter=task" + "&value=" + values[0]);
    else if (filters.length === 1 && filters[0] === "name") {
      response = await this.http.get<Device[]>("/devices/robots?filter=name" + "&value=" + values[0]);
    } else throw new Error("Something went wrong");

    console.log(response);

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
}
