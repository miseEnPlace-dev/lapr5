import { describe, expect, it } from 'vitest';
import { DeviceNickname } from '../../../../src/domain/device/deviceNickname';

describe('DeviceNickname', () => {
  it('should not allow to create a nickname with more than 50 characters', () => {
    const result = DeviceNickname.create([...Array(51)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new nickname with 50 characters', () => {
    const result = DeviceNickname.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = DeviceNickname.create('12 a');
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const deviceNickname = DeviceNickname.create('12a!');
    expect(deviceNickname.isFailure).toBe(true);
  });
});
