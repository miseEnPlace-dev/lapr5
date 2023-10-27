import { FloorMapSize } from '../../../../../src/domain/floor/floorMap/floorMapSize';
import { describe, expect, it } from 'vitest';

describe('FloorMapSize', () => {
  it('should not allow to create a FloorMapSize with negative width', () => {
    const result = FloorMapSize.create(-1, 2);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMapSize with negative depth', () => {
    const result = FloorMapSize.create(2, -1);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMapSize with positive depth', () => {
    const result = FloorMapSize.create(2, 3);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().width).toBe(2);
    expect(result.getValue().depth).toBe(3);
  });
});
