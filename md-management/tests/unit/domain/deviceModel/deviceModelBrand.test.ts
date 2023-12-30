import { describe, expect, it } from 'vitest';
import { DeviceModelBrand } from '../../../../src/domain/deviceModel/deviceModelBrand';

describe('DeviceModelBrand', () => {
  it('should not allow to create a code with more than 50 characters', () => {
    const result = DeviceModelBrand.create([...Array(51)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 50 characters', () => {
    const result = DeviceModelBrand.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });
});
