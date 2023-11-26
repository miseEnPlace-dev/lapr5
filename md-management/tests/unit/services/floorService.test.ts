import 'reflect-metadata';

import { stub } from 'sinon';
import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import IFloorService from '../../../src/services/IServices/IFloorService';
import FloorService from '../../../src/services/floorService';
import IConnectorRepo from '../../../src/services/IRepos/IConnectorRepo';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { FloorDescription } from '../../../src/domain/floor/floorDescription';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { BuildingCode } from '../../../src/domain/building/buildingCode';

describe('Floor Service', () => {
  it('createFloor: should return error when code is invalid', async () => {
    const invalidCode = '123456';
    const floorDTO = {
      code: invalidCode,
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorService = container.get<IFloorService>(TYPES.floorService);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('createFloor: should return error when description is invalid', async () => {
    const invalidDescription = Array(256)
      .fill('a')
      .join('');
    const floorDTO = {
      code: '12345',
      description: invalidDescription,
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorService = container.get<IFloorService>(TYPES.floorService);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor description must be 255 characters or less.');
  });

  it('createFloor: should return error when width is invalid', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 0,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'save').resolves(floorDTO);
    stub(floorRepo, 'findByCode').resolves(null);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor dimensions are invalid');
  });

  it('createFloor: should return error when length is invalid', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 0
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'save').resolves(floorDTO);
    stub(floorRepo, 'findByCode').resolves(null);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.createFloor(floorDTO);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor dimensions are invalid');
  });

  it('createFloor: should return error when building code is invalid', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '123456',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorService = container.get<IFloorService>(TYPES.floorService);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building code must be 5 characters or less');
  });

  it('createFloor: should create a floor', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'save').resolves(floorDTO);
    stub(floorRepo, 'findByCode').resolves(null);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.createFloor(floorDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(floorDTO);
  });

  it('createFloor: should throw error if repo throws error', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'save').throws(new Error('Error'));
    stub(floorRepo, 'findByCode').resolves(null);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);

    expect(() => floorService.createFloor(floorDTO)).rejects.toThrowError('Error');
  });

  it('updateFloor: should update floor', async () => {
    const floor = {
      code: FloorCode.create('12345').getValue(),
      description: FloorDescription.create('Description').getValue(),
      buildingCode: BuildingCode.create('12345').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue()
    };

    const dto = {
      code: '12345',
      description: 'New Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves(floor);
    stub(floorRepo, 'save').resolves(dto);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.updateFloor(dto);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(dto);
  });

  it('updateFloor: should return error when floor does not exist', async () => {
    const dto = {
      code: '12345',
      description: 'New Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves(null);
    stub(floorRepo, 'save').resolves(dto);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.updateFloor(dto);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found');
  });

  it('updateFloor: should return error when building does not exist', async () => {
    const floor = {
      code: FloorCode.create('12345').getValue(),
      description: FloorDescription.create('Description').getValue(),
      buildingCode: BuildingCode.create('12345').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue()
    };

    const dto = {
      code: '12345',
      description: 'New Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves(floor);
    stub(floorRepo, 'save').resolves(dto);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(null);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.updateFloor(dto);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building does not exist');
  });

  it('updateFloor: should throw error if repo throws error', async () => {
    const dto = {
      code: '12345',
      description: 'New Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').throws(new Error('Error'));
    stub(floorRepo, 'save').resolves(dto);
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    });

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);

    expect(() => floorService.updateFloor(dto)).rejects.toThrowError('Error');
  });

  it('getBuildingFloors: should return error when building does not exist', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(null);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.getBuildingFloors('12345', '');

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building not found');
  });

  it('getBuildingFloors: should return building floors', async () => {
    const building = {
      code: BuildingCode.create('12345').getValue(),
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const floor = {
      code: FloorCode.create('12345').getValue(),
      description: FloorDescription.create('Description').getValue(),
      buildingCode: BuildingCode.create('12345').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue()
    };

    const floorDto = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByBuildingCode').resolves([floor]);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.getBuildingFloors('12345', '');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual([floorDto]);
  });

  it('getBuildingFloors: should work with a connectors filter', async () => {
    const building = {
      code: BuildingCode.create('12345').getValue(),
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const floor = {
      id: UniqueEntityID.create('1'),
      code: FloorCode.create('12345').getValue(),
      description: FloorDescription.create('Description').getValue(),
      buildingCode: BuildingCode.create('12345').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue()
    };

    const floorDto = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByBuildingCode').resolves([floor]);

    const connector = {
      code: '12345',
      floor1: {
        id: UniqueEntityID.create('1'),
        code: '12345',
        description: 'Description',
        buildingCode: '12345',
        dimensions: {
          width: 10,
          length: 10
        }
      },
      floor2: {
        id: UniqueEntityID.create('2'),
        code: '123456',
        description: 'Description',
        buildingCode: '123456',
        dimensions: {
          width: 10,
          length: 10
        }
      }
    };
    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    stub(connectorRepo, 'findOfFloors').resolves([connector]);

    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.getBuildingFloors('12345', 'connectors');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual([floorDto]);
  });

  it('getBuildingFloors: should work with a elevator filter', async () => {
    const floor = {
      code: FloorCode.create('12345').getValue(),
      description: FloorDescription.create('Description').getValue(),
      buildingCode: BuildingCode.create('12345').getValue(),
      dimensions: FloorDimensions.create(10, 10).getValue()
    };

    const building = {
      code: BuildingCode.create('12345').getValue(),
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      },
      elevator: { code: '12345', floors: [floor] }
    };

    const floorDto = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByBuildingCode').resolves([floor]);

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);

    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);
    const result = await floorService.getBuildingFloors('12345', 'elevator');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual([floorDto]);
  });
  it('getBuildingFloors: should throw error if repo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').throws(new Error('Error'));

    const connectorRepo = container.get<IConnectorRepo>(TYPES.connectorRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const floorService = new FloorService(floorRepo, buildingRepo, connectorRepo);

    expect(() => floorService.getBuildingFloors('12345', '')).rejects.toThrowError('Error');
  });
});
