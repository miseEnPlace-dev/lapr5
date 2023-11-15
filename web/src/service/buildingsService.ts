import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Building } from "../model/Building";
import { IApi } from "./IService/IApi";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingService implements IBuildingService {
  constructor(@inject(TYPES.api) private api: IApi) {}

  public async getBuildings(): Promise<Building[]> {
    const response = await this.api.get<Building[]>("/buildings");
    const data = response.data;
    return data;
  }

  public async getBuildingWithCode(code: string): Promise<Building> {
    const response = await this.api.get<Building>(`/buildings/${code}`);
    const data = response.data;
    return data;
  }
}
