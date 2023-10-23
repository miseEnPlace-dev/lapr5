import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

export default interface IBuildingService {
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;

  getBuildingsWithMinMaxFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>>;

  //  getBuilding(BuildingId: string): Promise<Result<IBuildingDTO>>;
}
