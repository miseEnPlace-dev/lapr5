import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Floor } from "../model/Floor";
import { HttpService } from "./IService/HttpService";
import { IFloorService } from "./IService/IFloorService";

@injectable()
export class FloorService implements IFloorService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async createFloor(buildingId: string, floor: Floor): Promise<Floor> {
    const response = await this.http.post<Floor>(
      `/buildings/${buildingId}/floors`,
      floor
    );

    const data = response.data;
    return data;
  }

  async getFloor(buildingId: string, floorId: string): Promise<Floor> {
    const response = await this.http.get<Floor>(
      `/buildings/${buildingId}/floors/${floorId}`
    );

    const data = response.data;
    return data;
  }

  async getBuildingFloors(
    buildingCode: string,
    filters?: string[]
  ): Promise<Floor[]> {
    const filter =
      filters && filters.length ? "?filter=" + filters.join(",") : "";
    const response = await this.http.get<Floor[]>(
      `/buildings/${buildingCode}/floors${filter}`
    );

    const data = response.data;
    return data;
  }
}
