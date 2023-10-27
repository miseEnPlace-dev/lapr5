import { describe, expect, it } from 'vitest';
import { DeviceDescription } from '../../../../src/domain/device/deviceDescription';

describe('DeviceDescription', () => {
  it('should not allow to create a description with more than 250 characters', () => {
    const result = DeviceDescription.create([...Array(251)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new description with 250 characters', () => {
    const result = DeviceDescription.create([...Array(250)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe([...Array(250)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = DeviceDescription.create('12 a');
    expect(result.isSuccess).toBe(true);
    console.log(result.getValue());
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const deviceDescription = DeviceDescription.create('12a!');
    expect(deviceDescription.isFailure).toBe(true);
  });
});
