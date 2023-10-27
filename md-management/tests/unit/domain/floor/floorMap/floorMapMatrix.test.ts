import { FloorMapMatrix } from '../../../../../src/domain/floor/floorMap/floorMapMatrix';
import { describe, it, expect } from 'vitest';

describe('FloorMapMatrix', () => {
  it('should not allow to create a matrix with values bigger than 3', () => {
    const matrix = [
      [0, 1, 2],
      [3, 4, 5]
    ];
    const result = FloorMapMatrix.create(matrix);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a matrix with negative values', () => {
    const matrix = [
      [0, 1, 2],
      [3, -1, 1]
    ];
    const result = FloorMapMatrix.create(matrix);
    expect(result.isFailure).toBe(true);
  });

  it('should create a matrix with valid values', () => {
    const matrix = [
      [0, 1, 2],
      [3, 2, 1]
    ];
    const result = FloorMapMatrix.create(matrix);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().matrix).toEqual(matrix);
  });
});
