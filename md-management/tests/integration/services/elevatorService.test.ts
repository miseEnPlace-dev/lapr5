import 'reflect-metadata';

import { describe, expect, it } from 'vitest';

import { stub } from 'sinon';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import { ElevatorCode } from '../../../src/domain/elevator/elevatorCode';
import { ElevatorDescription } from '../../../src/domain/elevator/elevatorDescription';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import ElevatorService from '../../../src/services/elevatorService';

describe('elevatorService', () => {
  it('getElevatorForBuilding: should fail if building code is invalid', async () => {
    const invalidCode = Array(6)
      .fill('a')
      .join('');

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.getElevatorForBuilding(invalidCode);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building code must be 5 characters or less');
  });

  it('getElevatorForBuilding: should fail if the building is not found', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(buildingRepo, 'findByCode').resolves(null);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.getElevatorForBuilding('12345');

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building not found');
  });

  it('getElevatorForBuilding: should fail if the building does not have an elevator', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.getElevatorForBuilding('12345');

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator not found');
  });

  it('getElevatorForBuilding: should throw error if buildingRepo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(buildingRepo, 'findByCode').throws(new Error('Error'));
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);

    await expect(elevatorService.getElevatorForBuilding('12345')).rejects.toThrow('Error');
  });

  it('getElevatorForBuilding: should list the elevator for the building', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '123',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue(),
        brand: 'Brand',
        model: 'Model',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.getElevatorForBuilding('12345');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });
  });
});
