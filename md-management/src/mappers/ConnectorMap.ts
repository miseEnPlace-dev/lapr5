import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Mapper } from '@/core/infra/Mapper';

import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';
import { Connector } from '@/domain/connector/connector';
import { ConnectorCode } from '@/domain/connector/connectorCode';
import { Floor } from '@/domain/floor/floor';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IFloorRepo from '@/services/IRepos/IFloorRepo';

export class ConnectorMap extends Mapper<Floor> {
  public static toDTO(c: Connector): IConnectorDTO {
    return {
      code: c.code.value,
      floor1Code: c.floor1.code.value,
      floor2Code: c.floor2.code.value
    };
  }

  public static async toDomain(connector: IConnectorPersistence): Promise<Connector | null> {
    const code = ConnectorCode.create(connector.code).getValue();

    const repo = container.get<IFloorRepo>(TYPES.floorRepo);

    const floor1 = await repo.findByDomainId(connector.floor1);
    const floor2 = await repo.findByDomainId(connector.floor2);
    if (!floor1 || !floor2) throw new Error('One/both of the floors was not found');

    const connectorOrError = Connector.create(
      {
        code,
        floor1,
        floor2
      },
      new UniqueEntityID(connector.domainId)
    );

    connectorOrError.isFailure && console.log(connectorOrError.error);

    return connectorOrError.isSuccess ? connectorOrError.getValue() : null;
  }

  public static toPersistence(connector: Connector): IConnectorPersistence {
    return {
      domainId: connector.id.toString(),
      code: connector.code.value,
      floor1: connector.floor1.id.toString(),
      floor2: connector.floor2.id.toString()
    };
  }
}
