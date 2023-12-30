import { describe, expect, it } from 'vitest';
import { DeviceSerialNumber } from '../../../../src/domain/device/deviceSerialNumber';

describe('DeviceSerialNumber', () => {
  it('should not allow to create a serial number with more than 50 characters', () => {
    const result = DeviceSerialNumber.create([...Array(51)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new serial number with 50 characters', () => {
    const result = DeviceSerialNumber.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = DeviceSerialNumber.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const deviceSerialNumber = DeviceSerialNumber.create('12a!');
    expect(deviceSerialNumber.isFailure).toBe(true);
  });
});
