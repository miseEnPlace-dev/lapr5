import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Building } from "../model/Building";
import { HttpService } from "./IService/HttpService";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingService implements IBuildingService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getBuildings(filters?: string[]): Promise<Building[]> {
    const filter = filters
      ? `?minFloors=${filters[0]}&maxFloors=${filters[1]}`
      : "";
    const response = await this.http.get<Building[]>("/buildings" + filter);
    const data = response.data;
    return data;
  }

  async getBuildingWithCode(code: string): Promise<Building> {
    const response = await this.http.get<Building>(`/buildings/${code}`);
    const data = response.data;
    return data;
  }

  async createBuilding(building: Building): Promise<Building> {
    const response = await this.http
      .post<Building>("/buildings", building)
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateBuilding(building: Building): Promise<Building> {
    const response = await this.http
      .put<Building>(`/buildings/${building.code}`, building)
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
}
