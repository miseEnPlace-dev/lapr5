import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { FloorMap } from "@/model/FloorMap";

import { Floor } from "../model/Floor";
import { HttpService } from "./IService/HttpService";
import { IFloorService } from "./IService/IFloorService";

@injectable()
export class FloorService implements IFloorService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getAllFloors(): Promise<Floor[]> {
    const response = await this.http.get<Floor[]>("/floors");

    const data = response.data;
    return data;
  }

  async createFloor(buildingId: string, floor: Floor): Promise<Floor> {
    const response = await this.http
      .post<Floor>(`/buildings/${buildingId}/floors`, floor)
      .catch((error) => {
        throw error.message;
      });

    const data = response.data;
    return data;
  }

  async updateFloor(buildingId: string, floor: Floor): Promise<Floor> {
    const response = await this.http.put<Floor>(
      `/buildings/${buildingId}/floors/${floor.code}`,
      floor
    );

    if (response.status === 400) throw new Error("Something went wrong");

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

  async uploadFloor(
    buildingId: string,
    floorCode: string,
    map: string
  ): Promise<any> {
    const response = await this.http.patch<FloorMap>(
      `/buildings/${buildingId}/floors/${floorCode}`,
      JSON.parse(map)
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const data = response.data;
    return data;
  }
}
