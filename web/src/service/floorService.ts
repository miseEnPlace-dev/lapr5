import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Floor } from "../model/Floor";
import { IApi } from "./IService/IApi";
import { IFloorService } from "./IService/IFloorService";

@injectable()
export class FloorService implements IFloorService {
  constructor(@inject(TYPES.api) private api: IApi) {}

  public async getBuildingFloors(buildingCode: string): Promise<Floor[]> {
    const response = await this.api.get<Floor[]>(
      `/buildings/${buildingCode}/floors`
    );

    const data = response.data;
    return data;
  }

  public async getBuildingFloorsWithConnectors(
    buildingId: string
  ): Promise<Floor[]> {
    const response = await this.api.get<Floor[]>(
      `/buildings/${buildingId}/floors?filter=connectors`
    );
    const data = response.data;
    return data;
  }
}
