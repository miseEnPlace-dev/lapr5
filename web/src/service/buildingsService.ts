import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { IPaginationDTO } from "@/dto/IPaginationDTO";

import { Building } from "../model/Building";
import { HttpService } from "./IService/HttpService";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingService implements IBuildingService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getBuildings(
    filters?: string[],
    page?: number,
    limit?: number
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

    const token = this.localStorage.getItem(localStorageConfig.token);
    const response = await this.http.get<IPaginationDTO<Building>>(
      "/buildings",
      { params, headers: { Authorization: `Bearer ${token}` } }
    );
    const data = response.data;
    return data;
  }

  async getBuildingWithCode(code: string): Promise<Building> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Building>(`/buildings/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  }

  async createBuilding(building: Building): Promise<Building> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Building>("/buildings", building, {
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

  async updateBuilding(building: Building): Promise<Building> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .put<Building>(`/buildings/${building.code}`, building, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
}
