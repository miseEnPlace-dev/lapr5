import { FloorMazeExits } from '../../../../../src/domain/floor/floorMap/floorMaze/floorMazeExits';
import { describe, expect, it } from 'vitest';

describe('FloorMazeExits', () => {
  it('should allow to create a FloorMazeExits with an empty array', () => {
    const result = FloorMazeExits.create([]);
    expect(result.isSuccess).toBe(true);
  });

  it('should allow to create a FloorMazeExits', () => {
    const exit = [
      { x: 1, y: 1, floorCode: '123' },
      { x: 2, y: 2, floorCode: '123' }
    ];
    const result = FloorMazeExits.create(exit);
    expect(result.isSuccess).toBe(true);
  });
});
