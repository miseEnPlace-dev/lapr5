import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { Device } from "@/model/Device";

import { HttpService } from "./IService/HttpService";
import { IDeviceService } from "./IService/IDeviceService";
import { IPaginationDTO } from "@/dto/IPaginationDTO";

@injectable()
export class DeviceService implements IDeviceService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) { }

  async getDevicesRobots(
    filter?: "task" | "model",
    value?: string,
    page: number = 0,
    limit: number = 2
  ): Promise<IPaginationDTO<Device>> {
    let response;

    const token = this.localStorage.getItem(localStorageConfig.token);

    const params = {} as { [key: string]: string };

    params["limit"] = limit.toString();
    params["page"] = page.toString();

    if (filter) {
      response = await this.http.get<IPaginationDTO<Device>>(
        "/devices/robots?filter=" + filter + "&value=" + value,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    else {
      response = await this.http.get<IPaginationDTO<Device>>("/devices/robots", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log('RESPONSE PAGE = ', page, response);

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
