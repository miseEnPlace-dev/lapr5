import { describe, expect, it } from 'vitest';
import { BuildingMaxDimensions } from '../../../../src/domain/building/buildingMaxDimensions';

describe('BUildingMaxDimensions', () => {
  it('should not allow create dimensions with negative values', () => {
    const result = BuildingMaxDimensions.create(-1, -1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero values', () => {
    const result = BuildingMaxDimensions.create(0, 0);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative width', () => {
    const result = BuildingMaxDimensions.create(-1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative length', () => {
    const result = BuildingMaxDimensions.create(1, -1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero width', () => {
    const result = BuildingMaxDimensions.create(0, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero length', () => {
    const result = BuildingMaxDimensions.create(1, 0);

    expect(result.isFailure).toBe(true);
  });

  it('should create new dimensions with positive values', () => {
    const result = BuildingMaxDimensions.create(1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().width).toBe(1);
    expect(result.getValue().length).toBe(1);
  });
});
