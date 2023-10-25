import { describe, expect, it } from 'vitest';
import { ElevatorCode } from '../../../../src/domain/elevator/elevatorCode';

describe('ElevatorCode', () => {
  it('should not allow to create a code with non positive number', () => {
    const result = ElevatorCode.create(-1);

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with a positive number', () => {
    const result = ElevatorCode.create(1);
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe(1);
  });
});
