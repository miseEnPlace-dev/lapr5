import { Building } from "../../model/Building";

export interface IBuildingService {
  getBuildings(): Promise<Building[]>;
  getBuildingWithCode(code: string): Promise<Building>;
}
