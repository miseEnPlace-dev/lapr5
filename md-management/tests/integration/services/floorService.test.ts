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

  /*TODO: Fix this test
  it('createFloor: should return error when width is invalid', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 0,
        length: 0
      }
    };

    const floorService = container.get<IFloorService>(TYPES.floorService);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor dimensions are invalid');
  })
  */

  /*TODO: Fix this test
  it('createFloor: should return error when length is invalid', async () => {
    const floorDTO = {
      code: '12345',
      description: 'Description',
      buildingCode: '12345',
      dimensions: {
        width: 0,
        length: 0
      }
    };

    const floorService = container.get<IFloorService>(TYPES.floorService);
    const result = await floorService.createFloor(floorDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor dimensions are invalid');
  });*/

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
});
