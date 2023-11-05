import 'reflect-metadata';

import { stub } from 'sinon';
import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import IConnectorRepo from '../../../src/services/IRepos/IConnectorRepo';
import IConnectorService from '../../../src/services/IServices/IConnectorService';
import ConnectorService from '../../../src/services/connectorService';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import { Floor } from '../../../src/domain/floor/floor';
import { Connector } from '../../../src/domain/connector/connector';
import { ConnectorCode } from '../../../src/domain/connector/connectorCode';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { BuildingCode } from '../../../src/domain/building/buildingCode';

describe('Connector Service', () => {
  it('createConnector: should return error when code is invalid', async () => {
    const invalidCode = Array(26)
      .fill('a')
      .join('');
    const connectorDTO = {
      code: invalidCode,
      floor1Code: '12345',
      floor2Code: '23456'
    };

    const connectorService = container.get<IConnectorService>(TYPES.connectorService);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Connector code must be 5 characters or less');
  });

  it('createConnector: should return error when floor 1 code is invalid', async () => {
    const invalidCode = Array(26)
      .fill('a')
      .join('');
    const connectorDTO = {
      code: '12345',
      floor1Code: invalidCode,
      floor2Code: '12345'
    };

    const connectorService = container.get<IConnectorService>(TYPES.connectorService);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('createConnector: should return error when floor 2 code is invalid', async () => {
    const invalidCode = Array(26)
      .fill('a')
      .join('');
    const connectorDTO = {
      code: '12345',
      floor1Code: '12345',
      floor2Code: invalidCode
    };

    const connectorService = container.get<IConnectorService>(TYPES.connectorService);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('createConnector: should return error when floor codes are the same', async () => {
    const connectorDTO = {
      code: '12345',
      floor1Code: '21212',
      floor2Code: '21212'
    };

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floor = Floor.create({
      code: FloorCode.create('21212').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('12345').getValue()
    }).getValue();

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves(floor);
    container.rebind(TYPES.floorRepo).toConstantValue(floorRepo);

    const connectorService = new ConnectorService(connectorRepo, floorRepo, buildingRepo);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floors cannot be the same');
  });

  it("createConnector: should return error when floor codes don't belong to different buildings", async () => {
    const connectorDTO = {
      code: '12345',
      floor1Code: '21212',
      floor2Code: '21212'
    };

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floor1 = Floor.create({
      code: FloorCode.create('21212').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('12345').getValue()
    }).getValue();

    const floor2 = Floor.create({
      code: FloorCode.create('21212').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('12345').getValue()
    }).getValue();

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode')
      .onFirstCall()
      .resolves(floor1)
      .onSecondCall()
      .resolves(floor2);
    container.rebind(TYPES.floorRepo).toConstantValue(floorRepo);

    const connectorService = new ConnectorService(connectorRepo, floorRepo, buildingRepo);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floors must be in different buildings');
  });

  it('createConnector: should return error when connector between floors already exists', async () => {
    const connectorDTO = {
      code: '12345',
      floor1Code: '12121',
      floor2Code: '21212'
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floor1 = Floor.create({
      code: FloorCode.create('12121').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('54321').getValue()
    }).getValue();

    const floor2 = Floor.create({
      code: FloorCode.create('21212').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('12345').getValue()
    }).getValue();

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode')
      .onFirstCall()
      .resolves(floor1)
      .onSecondCall()
      .resolves(floor2);
    container.rebind(TYPES.floorRepo).toConstantValue(floorRepo);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    stub(connectorRepo, 'findBetweenFloors').resolves(true);
    container.rebind(TYPES.connectorRepo).toConstantValue(connectorRepo);

    const connectorService = new ConnectorService(connectorRepo, floorRepo, buildingRepo);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Connector between those floors already exists');
  });

  it('createConnector: should create a connector successfully', async () => {
    const connectorDTO = {
      code: '12345',
      floor1Code: '34343',
      floor2Code: '21212'
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floor1 = Floor.create({
      code: FloorCode.create('34343').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('34343').getValue()
    }).getValue();

    const floor2 = Floor.create({
      code: FloorCode.create('21212').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue(),
      buildingCode: BuildingCode.create('12345').getValue()
    }).getValue();

    const connector = Connector.create({
      code: ConnectorCode.create(connectorDTO.code).getValue(),
      floor1,
      floor2
    }).getValue();

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode')
      .onFirstCall()
      .resolves(floor1)
      .onSecondCall()
      .resolves(floor2);
    container.rebind(TYPES.floorRepo).toConstantValue(floorRepo);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    stub(connectorRepo, 'findBetweenFloors').resolves(false);
    stub(connectorRepo, 'save').resolves(connector);
    container.rebind(TYPES.connectorRepo).toConstantValue(connectorRepo);

    const connectorService = new ConnectorService(connectorRepo, floorRepo, buildingRepo);
    const result = await connectorService.createConnector(connectorDTO);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(connectorDTO);
  });
});
