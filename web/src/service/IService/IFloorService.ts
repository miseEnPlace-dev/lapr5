import { Floor } from "../../model/Floor";

export interface IFloorService {
  getBuildingFloors(buildingId: string): Promise<Floor[]>;
  getBuildingFloorsWithConnectors(buildingId: string): Promise<Floor[]>;
}
