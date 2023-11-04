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

  it('createElevator: should fail if building code is invalid', async () => {
    const invalidCode = Array(6)
      .fill('a')
      .join('');

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: invalidCode,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building code must be 5 characters or less');
  });

  it('createElevator: should fail if the building is not found', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(buildingRepo, 'findByCode').resolves(null);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building not found');
  });

  it('createElevator: should fail if the building already has an elevator', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
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
    });
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator already exists');
  });

  it('createElevator: should fail if a floor is not found', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves(null);

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found');
  });

  it('createElevator: should fail if a floor is not found in the building', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '54321'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found in building');
  });

  it('createElevator: should fail if the elevator code is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: -1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator code is not greater than 0.');
  });

  it('createElevator: should fail if the elevator brand is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: Array(51)
        .fill('a')
        .join(''),
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Brand cannot exceed 50 characters');
  });

  it('createElevator: should fail if the elevator model is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: Array(51)
        .fill('a')
        .join(''),
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Model cannot exceed 50 characters');
  });

  it('createElevator: should fail if the elevator description is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: Array(256)
        .fill('a')
        .join(''),
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator description must be 255 characters or less');
  });

  it('createElevator: should fail if the serial number is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      serialNumber: Array(51)
        .fill('a')
        .join(''),
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator serial number cannot exceed 50 characters');
  });

  it('createElevator: should fail if the elevator floor code is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building'
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1321231123']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('createElevator: should fail if one of the elevator floor codes is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1', '1321231123']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('createElevator: should fail if the floor does not exist', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);

    stub(floorRepo, 'findByCode').resolves(null);

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found');
  });

  it('createElevator: should fail if the floor does not belong to building', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '54321'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found in building');
  });

  it('createElevator: should create elevator', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
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
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });
  });

  it('createElevator: should fail if elevator already exists', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
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
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator already exists');
  });

  it('createElevator: should throw error if buildingRepo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').throws(new Error('Error'));

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);

    await expect(
      elevatorService.createElevator({
        buildingCode: '12345',
        code: 1,
        description: 'Elevator',
        brand: 'Brand',
        model: 'Model',
        floorCodes: ['1']
      })
    ).rejects.toThrow('Error');
  });

  it('createElevator: should create elevator wo/ serial number', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
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
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1'],
      serialNumber: '123'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1'],
      serialNumber: '123'
    });
  });

  it('createElevator: should create elevator wo/ description', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1'],
      serialNumber: '123'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1'],
      serialNumber: '123'
    });
  });

  it('createElevator: should create elevator wo/ brand and model', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: null
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue(),
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.createElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      floorCodes: ['1'],
      serialNumber: '123'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      floorCodes: ['1'],
      serialNumber: '123'
    });
  });

  it('editElevator: should fail if building code is invalid', async () => {
    const invalidCode = Array(6)
      .fill('a')
      .join('');

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: invalidCode,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building code must be 5 characters or less');
  });

  it('editElevator: should fail if building code is not provided', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: undefined,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator code not provided');
  });

  it('editElevator: should fail if the building is not found', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves(null);

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Building not found');
  });

  it('editElevator: should fail if the building does not have an elevator', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: null
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model'
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator not found');
  });

  it('editElevator: should fail if the elevator code is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: '12345',
      code: -1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator code is not greater than 0.');
  });

  it('editElevator: should fail if the elevator brand is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });
    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue()
      }
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: Array(101)
        .fill('a')
        .join(''),
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Brand cannot exceed 50 characters');
  });

  it('editElevator: should fail if the elevator model is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').resolves({
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        description: ElevatorDescription.create('Elevator').getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    });
    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: '12345',
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: Array(51)
        .fill('a')
        .join(''),
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Model cannot exceed 50 characters');
  });

  it('editElevator: should fail if the elevator description is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: Array(256)
        .fill('a')
        .join(''),
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator description must be 255 characters or less');
  });

  it('editElevator: should fail if the serial number is invalid', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '12345'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      serialNumber: Array(51)
        .fill('a')
        .join(''),
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Elevator serial number cannot exceed 50 characters');
  });

  it('editElevator: should fail if the elevator floor code is invalid', async () => {
    const invalidCode = Array(6)
      .fill('a')
      .join('');

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: [invalidCode]
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('editElevator: should fail if one of the elevator floor codes is invalid', async () => {
    const invalidCode = Array(6)
      .fill('a')
      .join('');

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1', invalidCode]
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor code must be 5 characters or less');
  });

  it('editElevator: should fail if the floor does not exist', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);

    stub(floorRepo, 'findByCode').resolves(null);

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found');
  });

  it('editElevator: should fail if the floor does not belong to building', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: ElevatorCode.create(1).getValue(),
        brand: 'Brand',
        model: 'Model'
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: '54321'
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Floor not found in building');
  });

  it('editElevator: should edit elevator', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: 1,
        description: 'Elevator',
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
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: 1,
        description: 'Elevator',
        brand: 'Brand',
        model: 'Model',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });
  });

  it('editElevator: should throw error if buildingRepo throws error', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    stub(buildingRepo, 'findByCode').throws(new Error('Error'));

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);

    await expect(
      elevatorService.editElevator({
        buildingCode: '12345',
        code: 1,
        description: 'Elevator',
        brand: 'Brand',
        model: 'Model'
      })
    ).rejects.toThrow('Error');
  });

  it('editElevator: should edit elevator wo/ serial number', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);

    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: 1,
        description: 'Elevator',
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
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: 1,
        description: 'Elevator',
        brand: 'Brand',
        model: 'Model',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      serialNumber: '123'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      brand: 'Brand',
      model: 'Model',
      serialNumber: '123',
      floorCodes: ['1']
    });
  });

  it('editElevator: should edit elevator wo/ description', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: 1,
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
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: 1,
        brand: 'Brand',
        model: 'Model',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      brand: 'Brand',
      model: 'Model'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      brand: 'Brand',
      model: 'Model',
      floorCodes: ['1']
    });
  });

  it('editElevator: should edit elevator wo/ brand and model', async () => {
    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const building = {
      code: '12345',
      name: 'Building',
      elevator: {
        code: 1,
        description: 'Elevator',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    };

    stub(buildingRepo, 'findByCode').resolves(building);
    stub(buildingRepo, 'save').resolves({
      code: building.code,
      name: building.name,
      elevator: {
        code: 1,
        description: 'Elevator',
        floors: [
          {
            code: FloorCode.create('1').getValue()
          }
        ]
      }
    });

    stub(floorRepo, 'findByCode').resolves({
      code: FloorCode.create('1').getValue(),
      buildingCode: building.code
    });

    const elevatorService = new ElevatorService(buildingRepo, floorRepo);
    const result = await elevatorService.editElevator({
      buildingCode: building.code,
      code: 1,
      description: 'Elevator'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({
      code: 1,
      description: 'Elevator',
      floorCodes: ['1']
    });
  });
});
