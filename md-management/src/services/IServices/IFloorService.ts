import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  getBuildingFloors(buildingId: BuildingCode): Promise<Result<IFloorDTO[]>>;

  getFloorsWithElevator(buildingCode: BuildingCode): Promise<Result<IFloorDTO[]>>;

  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  uploadMap(floorCode: string, map: IFloorMapDTO): Promise<Result<IFloorDTO>>;

  //  getBuilding(BuildingId: string): Promise<Result<IBuildingDTO>>;
}
