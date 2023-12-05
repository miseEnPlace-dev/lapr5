import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Building } from "@/model/Building";

export interface IBuildingService {
  getBuildings(
    filters?: string[],
    page?: number,
    count?: number
  ): Promise<IPaginationDTO<Building>>;
  createBuilding(building: Building): Promise<Building>;
  updateBuilding(building: Building): Promise<Building>;
  getBuildingWithCode(code: string): Promise<Building>;
}
