import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { FloorMap } from "@/model/FloorMap";

import { Floor } from "../model/Floor";
import { HttpService } from "./IService/HttpService";
import { IFloorService } from "./IService/IFloorService";

@injectable()
export class FloorService implements IFloorService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getAllFloors(): Promise<Floor[]> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Floor[]>("/floors", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    return data;
  }

  async createFloor(buildingId: string, floor: Floor): Promise<Floor> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Floor>(`/buildings/${buildingId}/floors`, floor, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateFloor(buildingId: string, floor: Floor): Promise<Floor> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.put<Floor>(
      `/buildings/${buildingId}/floors/${floor.code}`,
      floor,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async getFloor(buildingId: string, floorId: string): Promise<Floor> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Floor>(
      `/buildings/${buildingId}/floors/${floorId}`,
      { headers: { Authorization: `Bearer ${token}` } }
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

    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Floor[]>(
      `/buildings/${buildingCode}/floors${filter}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = response.data;
    return data;
  }

  async uploadFloor(
    buildingId: string,
    floorCode: string,
    map: string
  ): Promise<FloorMap> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.patch<FloorMap>(
      `/buildings/${buildingId}/floors/${floorCode}`,
      JSON.parse(map),
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const data = response.data;
    return data;
  }
}
