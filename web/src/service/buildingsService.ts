import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";

import { Building } from "../model/Building";
import { HttpService } from "./IService/HttpService";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingService implements IBuildingService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getBuildings(
    filters?: string[],
    page: number = 0,
    limit: number = 2
  ): Promise<IPaginationDTO<Building>> {
    const params = {} as { [key: string]: string };
    if (filters) {
      params["minFloors"] = filters[0];
      params["maxFloors"] = filters[1];
    }
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }

    const response = await this.http.get<IPaginationDTO<Building>>(
      "/buildings",
      { params }
    );
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
