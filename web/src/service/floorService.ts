import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { Floor } from "@/model/Floor";
import { IApi } from "@/service/IService/IApi";
import { IFloorService } from "@/service/IService/IFloorService";

@injectable()
export class FloorService implements IFloorService {
  constructor(@inject(TYPES.api) private api: IApi) {}

  public async getBuildingFloors(buildingId: string): Promise<Floor[]> {
    const response = await this.api.get<Floor[]>(
      `/buildings/${buildingId}/floors`
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
