
import { Floor } from "../../model/Floor";

export interface IFloorService {
  getBuildingFloors(buildingId: string, filters?: string[]): Promise<Floor[]>;
  createFloor(buildingId: string, floor: Floor): Promise<Floor>;
  updateFloor(buildingId: string, floor: Floor): Promise<Floor>;
  getFloor(buildingId: string, floorId: string): Promise<Floor>;
  uploadFloor(buildingId: string, floorCode: string, map: string): Promise<any>;
  getAllFloors(): Promise<Floor[]>;
}
