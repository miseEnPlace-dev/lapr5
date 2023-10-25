import { describe, expect, it } from 'vitest';
import { FloorDimensions } from '../../../../src/domain/floor/floorDimensions';

describe('FloorDimensions', () => {
  it('should not allow create dimensions with negative values', () => {
    const result = FloorDimensions.create(-1, -1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero values', () => {
    const result = FloorDimensions.create(0, 0);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative width', () => {
    const result = FloorDimensions.create(-1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative height', () => {
    const result = FloorDimensions.create(1, -1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero width', () => {
    const result = FloorDimensions.create(0, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero height', () => {
    const result = FloorDimensions.create(1, 0);

    expect(result.isFailure).toBe(true);
  });

  it('should create new dimensions with positive values', () => {
    const result = FloorDimensions.create(1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().width).toBe(1);
    expect(result.getValue().height).toBe(1);
  });
});
