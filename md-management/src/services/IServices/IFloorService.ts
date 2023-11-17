import { Result } from '@/core/logic/Result';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  getBuildingFloors(buildingId: string, filter: string | undefined): Promise<Result<IFloorDTO[]>>;

  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  uploadMap(floorCode: string, map: IFloorMapDTO): Promise<Result<IFloorMapDTO>>;

  getFloorWithBuildingCode(buildingCode: string, floorCode: string): Promise<Result<IFloorDTO>>;
}
