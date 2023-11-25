import { FloorMazeExits } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeExits';
import { describe, expect, it } from 'vitest';

describe('FloorMazeExits', () => {
  it('should not allow to create a FloorMazeExits with an empty array', () => {
    const result = FloorMazeExits.create([]);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMazeExits with ', () => {
    const exits = [
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ];
    const result = FloorMazeExits.create(exits);
    expect(result.isSuccess).toBe(true);
  });
});
