import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { Connector } from '@/domain/connector/connector';

export default interface IConnectorRepo extends Repo<Connector> {
  save(connector: Connector): Promise<Connector>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Connector | null>;
  findAll(): Promise<Connector[]>;
  findByFloorId(floorId: UniqueEntityID): Promise<Connector[]>;
  findConnectorBetweenFloors(
    floor1Id: UniqueEntityID,
    floor2Id: UniqueEntityID
  ): Promise<Connector | null>;
  findConnectorsBetweenFloors(ids1: UniqueEntityID[], ids2: UniqueEntityID[]): Promise<Connector[]>;
}
