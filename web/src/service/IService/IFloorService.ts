import { Floor } from "../../model/Floor";

export interface IFloorService {
  getBuildingFloors(buildingId: string, filters?: string[]): Promise<Floor[]>;
  createFloor(buildingId: string, floor: Floor): Promise<Floor>;
  getFloor(buildingId: string, floorId: string): Promise<Floor>;
}
