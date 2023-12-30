import { describe, expect, it } from 'vitest';
import { DeviceModelName } from '../../../../src/domain/deviceModel/deviceModelName';

describe('DeviceModelName', () => {
  it('should not allow to create a code with more than 100 characters', () => {
    const result = DeviceModelName.create([...Array(101)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 100 characters', () => {
    const result = DeviceModelName.create([...Array(100)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(100)].map(() => 'a').join(''));
  });
});
