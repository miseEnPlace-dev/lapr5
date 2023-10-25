import Container from 'typedi';

import config from '@/config.mjs';

import { Mapper } from '@/core/infra/Mapper';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';

import { Floor } from '@/domain/floor/floor';
import { Connector } from '@/domain/connector/connector';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import { ConnectorCode } from '@/domain/connector/connectorCode';

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

    const repo = Container.get<IFloorRepo>(config.repos.floor.name);

    const floor1 = await repo.findByDomainId(connector.floor1);
    const floor2 = await repo.findByDomainId(connector.floor1);
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
