import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Building } from "../model/Building";
import { HttpService } from "./IService/HttpService";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingService implements IBuildingService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getBuildings(): Promise<Building[]> {
    const response = await this.http.get<Building[]>("/buildings");
    const data = response.data;
    return data;
  }

  async getBuildingWithCode(code: string): Promise<Building> {
    const response = await this.http.get<Building>(`/buildings/${code}`);
    const data = response.data;
    return data;
  }
}
