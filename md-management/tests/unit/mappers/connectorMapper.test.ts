import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Connector } from '../../../src/domain/connector/connector';
import { ConnectorCode } from '../../../src/domain/connector/connectorCode';
import { ConnectorMapper } from '../../../src/mappers/ConnectorMapper';

import { stub } from 'sinon';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { Floor } from '../../../src/domain/floor/floor';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';

describe('Connector Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a connector to a dto', () => {
    const connectorDTO = {
      code: '1',
      floor1BuildingCode: 'b1',
      floor1Code: 'f1',
      floor2BuildingCode: 'b1',
      floor2Code: 'f2'
    };

    const floor1 = Floor.create({
      code: FloorCode.create('f1').getValue(),
      buildingCode: BuildingCode.create('b1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    });

    const floor2 = Floor.create({
      code: FloorCode.create('f2').getValue(),
      buildingCode: BuildingCode.create('b1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    });

    const connector = Connector.create({
      code: ConnectorCode.create('1').getValue(),
      floor1: floor1.getValue(),
      floor2: floor2.getValue()
    });

    const result = ConnectorMapper.toDTO(connector.getValue());

    expect(result).toEqual(connectorDTO);
  });

  it('should map a connector to persistence', () => {
    const floor1 = Floor.create(
      {
        code: FloorCode.create('f1').getValue(),
        buildingCode: BuildingCode.create('b1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const floor2 = Floor.create(
      {
        code: FloorCode.create('f2').getValue(),
        buildingCode: BuildingCode.create('b1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('2')
    );

    const connector = Connector.create(
      {
        code: ConnectorCode.create('1').getValue(),
        floor1: floor1.getValue(),
        floor2: floor2.getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = ConnectorMapper.toPersistence(connector.getValue());

    expect(result).toEqual({
      domainId: '1',
      code: '1',
      floor1: '1',
      floor2: '2'
    });
  });

  it('should map a connector from persistence', async () => {
    const floor1 = Floor.create(
      {
        code: FloorCode.create('f1').getValue(),
        buildingCode: BuildingCode.create('b1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const floor2 = Floor.create(
      {
        code: FloorCode.create('f2').getValue(),
        buildingCode: BuildingCode.create('b1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('2')
    );

    const connector = Connector.create(
      {
        code: ConnectorCode.create('1').getValue(),
        floor1: floor1.getValue(),
        floor2: floor2.getValue()
      },
      UniqueEntityID.create('1')
    );

    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    const floorRepoStubFindByDomainId = stub(floorRepoStub, 'findByDomainId');
    floorRepoStubFindByDomainId.onCall(0).resolves(floor1.getValue());
    floorRepoStubFindByDomainId.onCall(1).resolves(floor2.getValue());
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    const result = await ConnectorMapper.toDomain({
      domainId: '1',
      code: '1',
      floor1: '1',
      floor2: '2'
    });

    expect(result).toEqual(connector.getValue());
  });

  it('should throw an error if one of the floors is not found in toDomain', async () => {
    const floor1 = Floor.create(
      {
        code: FloorCode.create('f1').getValue(),
        buildingCode: BuildingCode.create('b1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    const floorRepoStubFindByDomainId = stub(floorRepoStub, 'findByDomainId');
    floorRepoStubFindByDomainId.onCall(0).resolves(floor1.getValue());
    floorRepoStubFindByDomainId.onCall(1).resolves(null);
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    await expect(
      ConnectorMapper.toDomain({
        domainId: '1',
        code: '1',
        floor1: '1',
        floor2: '2'
      })
    ).rejects.toThrow('One/both of the floors was not found');
  });
});
