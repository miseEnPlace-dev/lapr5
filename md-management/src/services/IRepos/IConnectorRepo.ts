import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { Connector } from '@/domain/connector/connector';
import { FloorCode } from '@/domain/floor/floorCode';

export default interface IConnectorRepo extends Repo<Connector> {
  save(connector: Connector): Promise<Connector>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Connector | null>;
  findAll(): Promise<Connector[]>;
  findByFloorId(floorId: FloorCode): Promise<Connector[]>;
}
