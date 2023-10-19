import { describe, expect, it } from 'vitest';
import { BuildingCode } from '../../../../src/domain/building/buildingCode';

describe('BuildingCode', () => {
  it('should have at least 5 characters', () => {
    const buildingCode = BuildingCode.create('1234');
    expect(buildingCode).toThrow();
  });
});
