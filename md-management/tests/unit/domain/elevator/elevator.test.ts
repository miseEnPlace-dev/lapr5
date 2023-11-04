import { describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Elevator } from '../../../../src/domain/elevator/elevator';
import { ElevatorCode } from '../../../../src/domain/elevator/elevatorCode';
import { Floor } from '../../../../src/domain/floor/floor';

describe('Elevator', () => {
  it('should fail if some of the args is undefined', () => {
    const result = Elevator.create({
      code: (undefined as unknown) as ElevatorCode,
      floors: (undefined as unknown) as Floor[]
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if some of the args is null', () => {
    const result = Elevator.create({
      code: (null as unknown) as ElevatorCode,
      floors: (null as unknown) as Floor[]
    });

    expect(result.isFailure).toBe(true);
  });

  it('should create a new elevator with given id', () => {
    const result = Elevator.create(
      {
        code: ElevatorCode.create(1).getValue(),
        floors: []
      },
      UniqueEntityID.create('id')
    );

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString()).toBe('id');
  });

  it('should generate a new uuid if no id is given', () => {
    const result = Elevator.create({
      code: ElevatorCode.create(1).getValue(),
      floors: []
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString().length).toBe(36);
  });
});
