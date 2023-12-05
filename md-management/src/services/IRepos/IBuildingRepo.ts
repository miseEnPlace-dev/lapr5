import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Repo } from '../../core/infra/Repo';

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findAll(page?: number, count?: number): Promise<Building[]>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Building | null>;
  findByCode(code: BuildingCode): Promise<Building | null>;
}
