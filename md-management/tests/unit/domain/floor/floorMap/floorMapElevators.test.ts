import { FloorMapElevators } from '../../../../../src/domain/floor/floorMap/floorMapElevators';
import { describe, expect, it } from 'vitest';

describe('FloorMapElevators', () => {
  it('should not allow to create a FloorMapElevators with an empty array', () => {
    const result = FloorMapElevators.create([]);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMapElevators with a negative X', () => {
    const result = FloorMapElevators.create([{ x: -1, y: 1 }]);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMapElevators with a negative Y', () => {
    const result = FloorMapElevators.create([{ x: 1, y: -1 }]);
    expect(result.isFailure).toBe(true);
  });
  it('should allow to create a FloorMapElevators with positive values', () => {
    const result = FloorMapElevators.create([{ x: 1, y: 1 }]);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().elevators[0].x).toBe(1);
    expect(result.getValue().elevators[0].y).toBe(1);
  });
});
