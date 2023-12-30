import { describe, expect, it } from 'vitest';
import { DeviceModelCode } from '../../../../src/domain/deviceModel/deviceModelCode';

describe('DeviceCode', () => {
  it('should not allow to create a code with more than 25 characters', () => {
    const result = DeviceModelCode.create([...Array(26)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 25 characters', () => {
    const result = DeviceModelCode.create([...Array(25)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(25)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = DeviceModelCode.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const deviceModelCode = DeviceModelCode.create('12a!');
    expect(deviceModelCode.isFailure).toBe(true);
  });

  it('should not allow empty codes', () => {
    const deviceModelCode = DeviceModelCode.create('');
    expect(deviceModelCode.isFailure).toBe(true);
  });
});
