import { FloorMapExits } from '../../../../../src/domain/floor/floorMap/floorMapExits';
import { describe, expect, it } from 'vitest';

describe('FloorMapExits', () => {
  it('should not allow to create a FloorMapExits with an empty array', () => {
    const result = FloorMapExits.create([]);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMapExits with ', () => {
    const exits = [
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ];
    const result = FloorMapExits.create(exits);
    expect(result.isSuccess).toBe(true);
  });
});
