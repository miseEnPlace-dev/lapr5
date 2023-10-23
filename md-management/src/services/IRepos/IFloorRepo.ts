import { Floor } from '@/domain/floor/floor';
import { Repo } from '@/core/infra/Repo';
import { FloorCode } from '@/domain/floor/floorCode';
import { BuildingCode } from '@/domain/building/buildingCode';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(roleId: FloorCode | string): Promise<Floor | null>;
  findAll(): Promise<Floor[]>;
  findByBuildingId(buildingId: BuildingCode): Promise<Floor[]>;
  findByBuildingIdWithElevator(buildingId: BuildingCode): Promise<Floor[]>;
}
