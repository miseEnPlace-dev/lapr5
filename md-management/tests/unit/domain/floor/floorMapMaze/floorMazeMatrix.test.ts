import { FloorMazeMatrix } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeMatrix';
import { describe, it, expect } from 'vitest';

describe('FloorMazeMatrix', () => {
  it('should not allow to create a matrix with values different than 0-5 or 11-12', () => {
    const matrix = [
      [0, 1, 2],
      [3, 4, 19]
    ];
    const result = FloorMazeMatrix.create(matrix);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a matrix with negative values', () => {
    const matrix = [
      [0, 1, 2],
      [3, -1, 1]
    ];
    const result = FloorMazeMatrix.create(matrix);
    expect(result.isFailure).toBe(true);
  });

  it('should create a matrix with valid values', () => {
    const matrix = [
      [0, 1, 2],
      [3, 2, 1]
    ];
    const result = FloorMazeMatrix.create(matrix);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().matrix).toEqual(matrix);
  });
});
