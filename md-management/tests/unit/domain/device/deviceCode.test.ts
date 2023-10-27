import { describe, expect, it } from 'vitest';
import { DeviceCode } from '../../../../src/domain/device/deviceCode';

describe('DeviceCode', () => {
  it('should not allow to create a code with more than 30 characters', () => {
    const result = DeviceCode.create([...Array(31)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 30 characters', () => {
    const result = DeviceCode.create([...Array(30)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe([...Array(30)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = DeviceCode.create('12 a');
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const deviceCode = DeviceCode.create('12a!');
    expect(deviceCode.isFailure).toBe(true);
  });
});
