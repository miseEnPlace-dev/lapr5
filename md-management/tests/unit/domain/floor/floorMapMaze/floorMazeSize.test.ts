import { FloorMazeSize } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeSize';
import { describe, expect, it } from 'vitest';

describe('FloorMazeSize', () => {
  it('should not allow to create a FloorMazeSize with negative width', () => {
    const result = FloorMazeSize.create(-1, 2);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMazeSize with negative depth', () => {
    const result = FloorMazeSize.create(2, -1);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMazeSize with positive depth', () => {
    const result = FloorMazeSize.create(2, 3);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().width).toBe(2);
    expect(result.getValue().depth).toBe(3);
  });
});
