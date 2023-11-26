import 'reflect-metadata';

import { stub } from 'sinon';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { Elevator } from '../../../src/domain/elevator/elevator';
import { ElevatorBranding } from '../../../src/domain/elevator/elevatorBranding';
import { ElevatorCode } from '../../../src/domain/elevator/elevatorCode';
import { ElevatorDescription } from '../../../src/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '../../../src/domain/elevator/elevatorSerialNumber';
import { Floor } from '../../../src/domain/floor/floor';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import { ElevatorMapper } from '../../../src/mappers/ElevatorMapper';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';

describe('Elevator Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map an elevator to a dto', () => {
    const elevatorDTO = {
      code: 1,
      floorCodes: ['1'],
      brand: 'brand',
      model: 'model'
    };

    const elevator = Elevator.create({
      code: ElevatorCode.create(1).getValue(),
      floors: [
        Floor.create({
          code: FloorCode.create('1').getValue(),
          buildingCode: BuildingCode.create('1').getValue(),
          dimensions: FloorDimensions.create(1, 1).getValue()
        }).getValue()
      ],
      branding: ElevatorBranding.create('brand', 'model').getValue()
    });

    const result = ElevatorMapper.toDTO(elevator.getValue());

    expect(result).toEqual(elevatorDTO);
  });

  it('should map an elevator to persistence', () => {
    const floor = Floor.create({
      code: FloorCode.create('1').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    }).getValue();

    const elevator = Elevator.create({
      code: ElevatorCode.create(1).getValue(),
      floors: [floor],
      branding: ElevatorBranding.create('brand', 'model').getValue(),
      serialNumber: ElevatorSerialNumber.create('serial').getValue(),
      description: ElevatorDescription.create('description').getValue()
    });

    const result = ElevatorMapper.toPersistence(elevator.getValue());

    expect(result).toEqual({
      code: 1,
      floors: [floor.id.toValue()],
      branding: {
        brand: 'brand',
        model: 'model'
      },
      serialNumber: 'serial',
      description: 'description'
    });
  });

  it('should map an elevator from persistence', async () => {
    const floor = Floor.create({
      code: FloorCode.create('29').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    }).getValue();

    const elevator = Elevator.create(
      {
        code: ElevatorCode.create(2).getValue(),
        floors: [floor],
        serialNumber: ElevatorSerialNumber.create('serial').getValue(),
        description: ElevatorDescription.create('description').getValue()
      },
      UniqueEntityID.create('2')
    );

    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepoStub, 'findByDomainId').resolves(floor);
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    const result = await ElevatorMapper.toDomain({
      code: 2,
      floors: [floor.id.toValue()],
      serialNumber: 'serial',
      description: 'description'
    });

    expect(result.id.toString()).toEqual(elevator.getValue().id.toString());
    expect(result.code.value).toEqual(elevator.getValue().code.value);
    expect(result.floors[0].id.toString()).toEqual(elevator.getValue().floors[0].id.toString());
    expect(result.serialNumber.value).toEqual(elevator.getValue().serialNumber!.value);
    expect(result.description.value).toEqual(elevator.getValue().description!.value);
  });

  it('should map an elevator from persistence without optional fields', async () => {
    const floor = Floor.create({
      code: FloorCode.create('29').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    }).getValue();

    const elevator = Elevator.create(
      {
        code: ElevatorCode.create(2).getValue(),
        floors: [floor]
      },
      UniqueEntityID.create('2')
    );

    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepoStub, 'findByDomainId').resolves(floor);
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    const result = await ElevatorMapper.toDomain({
      code: 2,
      floors: [floor.id.toValue()]
    });

    expect(result.id.toString()).toEqual(elevator.getValue().id.toString());
    expect(result.code.value).toEqual(elevator.getValue().code.value);
    expect(result.floors[0].id.toString()).toEqual(elevator.getValue().floors[0].id.toString());
  });
});
