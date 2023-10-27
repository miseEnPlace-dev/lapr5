import { FloorMapExitLocation } from '../../../../../src/domain/floor/floorMap/floorMapExitLocation';
import { describe, expect, it } from 'vitest';

describe('FloorMapExitLocation', () => {
  it('should not allow to create a FloorMapExitLocation with a negative X', () => {
    const result = FloorMapExitLocation.create(-1, 1);
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a FloorMapExitLocation with a negative Y', () => {
    const result = FloorMapExitLocation.create(1, -1);
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create a FloorMapExitLocation with positive values', () => {
    const result = FloorMapExitLocation.create(1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().x).toBe(1);
    expect(result.getValue().y).toBe(1);
  });
});
