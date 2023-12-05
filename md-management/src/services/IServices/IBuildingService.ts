import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

export default interface IBuildingService {
  getBuildings(page?: number, limit?: number): Promise<Result<IPaginationDTO<IBuildingDTO>>>;
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(BuildingDTO: Partial<IBuildingDTO>, code: string): Promise<Result<IBuildingDTO>>;
  getBuildingsWithMinMaxFloors(
    min: number,
    max: number,
    page?: number,
    limit?: number
  ): Promise<Result<IPaginationDTO<IBuildingDTO>>>;
  getBuildingWithCode(code: string): Promise<Result<IBuildingDTO>>;
  //  getBuilding(BuildingId: string): Promise<Result<IBuildingDTO>>;
}
