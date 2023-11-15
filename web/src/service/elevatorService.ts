import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { Elevator } from "../model/Elevator";
import { IApi } from "./IService/IApi";
import { IElevatorService } from "./IService/IElevatorService";

@injectable()
export class ElevatorService implements IElevatorService {
  constructor(@inject(TYPES.api) private api: IApi) {}

  public async getBuildingElevator(
    buildingCode: string
  ): Promise<Elevator | null> {
    const response = await this.api.get<Elevator>(
      `/buildings/${buildingCode}/elevators`
    );

    if (response.status === 400) return null;

    const data = response.data;
    return data;
  }
}
