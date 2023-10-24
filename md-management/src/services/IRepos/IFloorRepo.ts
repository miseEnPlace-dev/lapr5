import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(floorId: UniqueEntityID | string): Promise<Floor | null>;
  findByCode(floorCode: FloorCode | string): Promise<Floor | null>;
  findBuildingCodesWithMinMaxFloors(min: number, max: number): Promise<string[]>;
  findAll(): Promise<Floor[]>;
  findByBuildingId(buildingId: UniqueEntityID | string): Promise<Floor[]>;
  findByBuildingIdWithElevator(buildingId: UniqueEntityID | string): Promise<Floor[]>;
}
