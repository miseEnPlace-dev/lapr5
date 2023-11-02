import 'reflect-metadata';

import { stub } from 'sinon';
import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

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
});
