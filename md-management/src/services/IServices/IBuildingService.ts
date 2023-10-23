import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

export default interface IBuildingService {
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getBuildings(): Promise<Result<IBuildingDTO[]>>;
  //  getBuilding(BuildingId: string): Promise<Result<IBuildingDTO>>;
}
