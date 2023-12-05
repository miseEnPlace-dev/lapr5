import 'reflect-metadata';

import { stub } from 'sinon';
import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { BuildingDescription } from '../../../src/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '../../../src/domain/building/buildingMaxDimensions';
import { BuildingName } from '../../../src/domain/building/buildingName';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import BuildingService from '../../../src/services/buildingService';

describe('Building Service', () => {
  it('createBuilding: should return error when code is invalid', async () => {
    const invalidCode = '123456';
    const buildingDTO = {
      code: invalidCode,
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingService = container.get<IBuildingService>(TYPES.buildingService);
    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building code must be 5 characters or less');
  });

  it('createBuilding: should return error when name is invalid', async () => {
    const invalidName = Array(51)
      .fill('a')
      .join('');
    const buildingDTO = {
      code: '12345',
      name: invalidName,
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingService = container.get<IBuildingService>(TYPES.buildingService);
    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building name must be 50 characters or less');
  });

  it('createBuilding: should return error when description is invalid', async () => {
    const invalidDescription = Array(256)
      .fill('a')
      .join('');
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: invalidDescription,
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingService = container.get<IBuildingService>(TYPES.buildingService);
    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building description must be 255 characters or less');
  });

  it('createBuilding: should return error when width is invalid', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 0,
        length: 0
      }
    };

    const buildingService = container.get<IBuildingService>(TYPES.buildingService);
    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Width is not greater than 0.');
  });

  it('createBuilding: should return error when length is invalid', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 0
      }
    };

    const buildingService = container.get<IBuildingService>(TYPES.buildingService);
    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Length is not greater than 0.');
  });

  it('createBuilding: should create a building', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      elevatorFloors: [],
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    stub(buildingRepo, 'findByCode').resolves(null);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(buildingDTO);
  });

  it('createBuilding: should not create a building when already exists', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    stub(buildingRepo, 'findByCode').resolves(buildingDTO);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building already exists');
  });

  it('getBuilding: should create building wo/ description (optional)', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: undefined,
      elevatorFloors: [],
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    stub(buildingRepo, 'findByCode').resolves(null);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(buildingDTO);
  });

  it('getBuilding: should create building wo/ name (optional)', async () => {
    const buildingDTO = {
      code: '12345',
      description: 'Description',
      elevatorFloors: [],
      name: undefined,
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    stub(buildingRepo, 'findByCode').resolves(null);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(buildingDTO);
  });

  it('getBuilding: should throw error when repo save throws error', async () => {
    const buildingDTO = {
      code: '12345',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').throws(new Error('Error'));
    stub(buildingRepo, 'findByCode').resolves(null);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.createBuilding(buildingDTO)).rejects.toThrowError('Error');
  });

  it('getBuilding: should throw error when repo findByCode throws error', async () => {
    const buildingDTO = {
      code: '12345',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    stub(buildingRepo, 'findByCode').throws(new Error('Error'));
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.createBuilding(buildingDTO)).rejects.toThrowError('Error');
  });

  // it('getBuildings: should return all buildings', async () => {
  //   const building = {
  //     code: BuildingCode.create('12345').getValue(),
  //     name: BuildingName.create('Building 1').getValue(),
  //     description: BuildingDescription.create('Description').getValue(),
  //     maxDimensions: BuildingMaxDimensions.create(10, 10).getValue()
  //   };

  //   const expected = {
  //     code: '12345',
  //     name: 'Building 1',
  //     description: 'Description',
  //     elevatorFloors: [],
  //     maxDimensions: {
  //       width: 10,
  //       length: 10
  //     }
  //   };

  //   const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
  //   stub(buildingRepo, 'findAll').resolves([building]);
  //   const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
  //   const buildingService = new BuildingService(buildingRepo, floorRepo);
  //   const result = await buildingService.getBuildings();

  //   expect(result.isSuccess).toBe(true);
  //   expect(result.getValue()).toEqual([expected]);
  // });

  it('getBuildings: should throw error if repo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findAll').throws(new Error('Error'));
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.getBuildings()).rejects.toThrowError('Error');
  });

  // it('getBuildingsWithMinMaxFloors: should return buildings with min/max floors', async () => {
  //   const building = {
  //     code: BuildingCode.create('12345').getValue(),
  //     name: BuildingName.create('Building 1').getValue(),
  //     description: BuildingDescription.create('Description').getValue(),
  //     maxDimensions: BuildingMaxDimensions.create(10, 10).getValue()
  //   };

  //   const expected = {
  //     code: '12345',
  //     name: 'Building 1',
  //     description: 'Description',
  //     elevatorFloors: [],
  //     maxDimensions: {
  //       width: 10,
  //       length: 10
  //     }
  //   };

  //   const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
  //   stub(buildingRepo, 'findByCode').resolves(building);
  //   const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
  //   stub(floorRepo, 'findBuildingCodesWithMinMaxFloors').resolves(['12345']);
  //   const buildingService = new BuildingService(buildingRepo, floorRepo);
  //   const result = await buildingService.getBuildingsWithMinMaxFloors(1, 2);

  //   expect(result.isSuccess).toBe(true);
  //   expect(result.getValue()).toEqual([expected]);
  // });

  it('getBuildingsWithMinMaxFloors: throw error if no building is found', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(null);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findBuildingCodesWithMinMaxFloors').resolves(['12345']);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.getBuildingsWithMinMaxFloors(1, 2)).rejects.toThrowError(
      'Building not found'
    );
  });

  it('getBuildingsWithMinMaxFloors: should throw error if repo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').throws(new Error('Error'));
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findBuildingCodesWithMinMaxFloors').resolves(['12345']);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.getBuildingsWithMinMaxFloors(1, 2)).rejects.toThrowError('Error');
  });

  // it('getBuildings: should return empty array if no buildings found', async () => {
  //   const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
  //   stub(buildingRepo, 'findAll').resolves([]);
  //   const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
  //   const buildingService = new BuildingService(buildingRepo, floorRepo);
  //   const result = await buildingService.getBuildings();

  //   expect(result.isSuccess).toBe(true);
  //   expect(result.getValue()).toEqual([]);
  // });

  it('updateBuilding: should update building', async () => {
    const building = {
      code: BuildingCode.create('12345').getValue(),
      name: BuildingName.create('Building 1').getValue(),
      description: BuildingDescription.create('Description').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue()
    };

    const dto = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      elevatorFloors: [],
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves(building);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.updateBuilding(dto, '12345');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(dto);
  });

  it('updateBuilding: should fail if building not found', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(null);
    stub(buildingRepo, 'save').resolves(buildingDTO);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    const res = await buildingService.updateBuilding(buildingDTO, '12345');

    expect(res.isFailure).toBe(true);
    expect(res.errorValue()).toBe('Building not found');
  });

  it('updateBuilding: should throw error if repo throws error', async () => {
    const buildingDTO = {
      code: '12345',
      name: 'Building 1',
      description: 'Description',
      maxDimensions: {
        width: 10,
        length: 10
      }
    };
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').throws(new Error('Error'));
    stub(buildingRepo, 'save').resolves(buildingDTO);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);

    expect(() => buildingService.updateBuilding(buildingDTO, '12345')).rejects.toThrowError(
      'Error'
    );
  });

  it('updateBuilding: should be able to edit wo/ description (optional)', async () => {
    const building = {
      code: BuildingCode.create('12345').getValue(),
      name: BuildingName.create('Building 1').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue()
    };

    const dto = {
      code: '12345',
      name: 'Building 1',
      description: undefined,
      elevatorFloors: [],
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves(building);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.updateBuilding(dto, '12345');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(dto);
  });

  it('updateBuilding: should be able to edit wo/ name (optional)', async () => {
    const building = {
      code: BuildingCode.create('12345').getValue(),
      description: BuildingDescription.create('Description').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue()
    };

    const dto = {
      code: '12345',
      description: 'Description',
      name: undefined,
      elevatorFloors: [],
      maxDimensions: {
        width: 10,
        length: 10
      }
    };

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves(building);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const buildingService = new BuildingService(buildingRepo, floorRepo);
    const result = await buildingService.updateBuilding(dto, '12345');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(dto);
  });
});
