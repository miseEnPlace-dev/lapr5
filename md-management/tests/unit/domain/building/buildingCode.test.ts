import { describe, expect, it } from 'vitest';
import { BuildingCode } from '../../../../src/domain/building/buildingCode';

describe('BuildingCode', () => {
  it('should throw error when creating code with more than 5 characters', () => {
    expect(() => BuildingCode.create('1234ab')).toThrowError('more than 5');
  });

  it('should create new code with 5 characters', () => {
    const buildingCode = BuildingCode.create('1234a');
    expect(buildingCode).toBeDefined();
  });

  it('should allow spaces', () => {
    const buildingCode = BuildingCode.create('12 a');
    expect(buildingCode).toBeDefined();
  });

  it('should not allow special characters', () => {
    expect(() => BuildingCode.create('12#a')).toThrowError('only letters');
  });
});
