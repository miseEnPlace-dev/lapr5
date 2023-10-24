import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

export default interface IBuildingService {
  getBuildings(): Promise<Result<IBuildingDTO[]>>;
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(BuildingDTO: Partial<IBuildingDTO>, code: string): Promise<Result<IBuildingDTO>>;
  getBuildingsWithMinMaxFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>>;

  getBuildings(): Promise<Result<IBuildingDTO[]>>;
  //  getBuilding(BuildingId: string): Promise<Result<IBuildingDTO>>;
}
