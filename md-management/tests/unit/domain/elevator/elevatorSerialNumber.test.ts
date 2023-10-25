import { describe, expect, it } from 'vitest';
import { ElevatorSerialNumber } from '../../../../src/domain/elevator/elevatorSerialNumber';

describe('ElevatorSerialNumber', () => {
  it('should not allow to create a serial number with more than 50 characters', () => {
    const result = ElevatorSerialNumber.create([...Array(51)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new serial number with 50 characters', () => {
    const result = ElevatorSerialNumber.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = ElevatorSerialNumber.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('12 a');
  });
});
