import { FloorMazeExitLocation } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeExitLocation';
import { describe, expect, it } from 'vitest';

describe('FloorMazeExitLocation', () => {
  it('should not allow to create a FloorMazeExitLocation with a negative X', () => {
    const result = FloorMazeExitLocation.create(-1, 1);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMazeExitLocation with a negative Y', () => {
    const result = FloorMazeExitLocation.create(1, -1);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMazeExitLocation with positive values', () => {
    const result = FloorMazeExitLocation.create(1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().x).toBe(1);
    expect(result.getValue().y).toBe(1);
  });
});
