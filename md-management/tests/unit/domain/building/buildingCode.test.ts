import { describe, expect, it } from 'vitest';
import { BuildingCode } from '../../../../src/domain/building/buildingCode';

describe('BuildingCode', () => {
  it('should not allow to create a code with more than 5 characters', () => {
    const result = BuildingCode.create('1234ab');

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 5 characters', () => {
    const result = BuildingCode.create('1234a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toValue()).toBe('1234a');
  });

  it('should allow spaces', () => {
    const result = BuildingCode.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toValue()).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const buildingCode = BuildingCode.create('12a!');
    expect(buildingCode.isFailure).toBe(true);
  });
});
