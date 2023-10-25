import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Building } from '@/domain/building/building';
import { Repo } from '../../core/infra/Repo';
import { BuildingCode } from '@/domain/building/buildingCode';

export default interface IBuildingRepo extends Repo<Building> {
  save(role: Building): Promise<Building>;
  findAll(): Promise<Building[]>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Building | null>;
  findByCode(code: BuildingCode | string): Promise<Building | null>;
}
