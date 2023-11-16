import { Floor } from "../../model/Floor";

export interface IFloorService {
  getBuildingFloors(buildingId: string, filters: string[]): Promise<Floor[]>;
}
