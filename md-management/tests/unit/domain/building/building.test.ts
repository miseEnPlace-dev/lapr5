import { describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Building } from '../../../../src/domain/building/building';
import { BuildingCode } from '../../../../src/domain/building/buildingCode';
import { BuildingDescription } from '../../../../src/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '../../../../src/domain/building/buildingMaxDimensions';
import { BuildingName } from '../../../../src/domain/building/buildingName';
import { Elevator } from '../../../../src/domain/elevator/elevator';
import { ElevatorCode } from '../../../../src/domain/elevator/elevatorCode';
import { Floor } from '../../../../src/domain/floor/floor';
import { FloorCode } from '../../../../src/domain/floor/floorCode';

describe('Building', () => {
  it('should fail if some of the args is undefined', () => {
    const result = Building.create({
      name: BuildingName.create('name').getValue(),
      code: (undefined as unknown) as BuildingCode,
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if some of the args is null', () => {
    const result = Building.create({
      name: BuildingName.create('name').getValue(),
      code: (null as unknown) as BuildingCode,
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    });

    expect(result.isFailure).toBe(true);
  });

  it('should create a new building with given id', () => {
    const result = Building.create(
      {
        name: BuildingName.create('name').getValue(),
        code: BuildingCode.create('code').getValue(),
        maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
        description: BuildingDescription.create('description').getValue()
      },
      UniqueEntityID.create('id')
    );

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString()).toBe('id');
  });

  it('should generate a new uuid if no id is given', () => {
    const result = Building.create({
      name: BuildingName.create('name').getValue(),
      code: BuildingCode.create('code').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString().length).toBe(36);
  });

  it('should update the name', () => {
    const building = Building.create({
      name: BuildingName.create('name').getValue(),
      code: BuildingCode.create('code').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    }).getValue();

    building.name = BuildingName.create('newName').getValue();

    expect(building.name.value).toBe('newName');
  });

  it('should update the description', () => {
    const building = Building.create({
      name: BuildingName.create('name').getValue(),
      code: BuildingCode.create('code').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    }).getValue();

    building.description = BuildingDescription.create('newDesc').getValue();

    expect(building.description.value).toBe('newDesc');
  });

  it('should update the max dimensions', () => {
    const building = Building.create({
      name: BuildingName.create('name').getValue(),
      code: BuildingCode.create('code').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    }).getValue();

    building.maxDimensions = BuildingMaxDimensions.create(20, 20).getValue();

    expect(building.maxDimensions.length).toBe(20);
    expect(building.maxDimensions.width).toBe(20);
  });

  it('should update the elevator', () => {
    const building = Building.create({
      name: BuildingName.create('name').getValue(),
      code: BuildingCode.create('code').getValue(),
      maxDimensions: BuildingMaxDimensions.create(10, 10).getValue(),
      description: BuildingDescription.create('description').getValue()
    }).getValue();

    const elevator = Elevator.create({
      code: ElevatorCode.create(1).getValue(),
      floors: [
        Floor.create({
          code: FloorCode.create('code').getValue(),
          buildingCode: building.code,
          dimensions: BuildingMaxDimensions.create(10, 10).getValue()
        }).getValue()
      ]
    });

    building.elevator = elevator.getValue();

    expect(building.elevator).toBe(elevator.getValue());
  });
});
