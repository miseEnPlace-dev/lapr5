import { FloorMazeElevator } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeElevator';
import { describe, expect, it } from 'vitest';

describe('FloorMazeElevator', () => {
  it('should allow to create a FloorMazeElevator with positive values', () => {
    const result = FloorMazeElevator.create(1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().x).toBe(1);
    expect(result.getValue().y).toBe(1);
  });
});
