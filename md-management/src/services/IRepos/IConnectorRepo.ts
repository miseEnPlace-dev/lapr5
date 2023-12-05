import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { Connector } from '@/domain/connector/connector';
import { ConnectorCode } from '@/domain/connector/connectorCode';

export default interface IConnectorRepo extends Repo<Connector> {
  save(connector: Connector): Promise<Connector>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Connector | null>;
  findByCode(code: ConnectorCode): Promise<Connector | null>;
  findAll(): Promise<Connector[]>;
  findByFloorId(floorId: UniqueEntityID): Promise<Connector[]>;
  findBetweenFloors(floor1Id: UniqueEntityID, floor2Id: UniqueEntityID): Promise<Connector | null>;
  findBetweenMultipleFloors(ids1: UniqueEntityID[], ids2: UniqueEntityID[]): Promise<Connector[]>;
  findOfFloors(ids: UniqueEntityID[]): Promise<Connector[]>;
  count(): Promise<number>;
}
