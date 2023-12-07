import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";

import { Elevator } from "../model/Elevator";
import { HttpService } from "./IService/HttpService";
import { IElevatorService } from "./IService/IElevatorService";

@injectable()
export class ElevatorService implements IElevatorService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getBuildingElevator(buildingCode: string): Promise<Elevator | null> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Elevator>(
      `/buildings/${buildingCode}/elevators`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400) return null;

    const data = response.data;
    return data;
  }

  async createElevator(
    buildingCode: string,
    elevator: Elevator
  ): Promise<Elevator> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Elevator>(`/buildings/${buildingCode}/elevators`, elevator, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateElevator(
    buildingCode: string,
    elevator: Partial<Elevator>
  ): Promise<Elevator> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .put<Elevator>(`/buildings/${buildingCode}/elevators`, elevator, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        throw "Something went wrong";
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
}
