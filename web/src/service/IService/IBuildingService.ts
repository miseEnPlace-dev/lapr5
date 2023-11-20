import { Building } from "../../model/Building";

export interface IBuildingService {
  getBuildings(): Promise<Building[]>;
  createBuilding(building: Building): Promise<Building>;
  updateBuilding(building: Building): Promise<Building>;
  getBuildingWithCode(code: string): Promise<Building>;
}
