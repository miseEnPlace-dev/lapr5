import "reflect-metadata";

import { injectable } from "inversify";

import { Building } from "../model/Building";
import api from "./api";
import { IBuildingService } from "./IService/IBuildingService";

@injectable()
export class BuildingsService implements IBuildingService {
  public async getBuildings(): Promise<Building[]> {
    const response = await api("/buildings");
    const data = await response.data;
    return data;
  }

  public async getBuildingWithCode(code: string): Promise<Building> {
    const response = await api(`/buildings/${code}`);
    const data = await response.data;
    return data;
  }
}
