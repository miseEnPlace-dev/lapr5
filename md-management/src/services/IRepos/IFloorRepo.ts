import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(floorId: UniqueEntityID | string): Promise<Floor | null>;
  findByCode(floorCode: FloorCode): Promise<Floor | null>;
  findBuildingCodesWithMinMaxFloors(min: number, max: number): Promise<BuildingCode[]>;
  findAll(): Promise<Floor[]>;
  findByBuildingCode(code: BuildingCode): Promise<Floor[]>;
}
