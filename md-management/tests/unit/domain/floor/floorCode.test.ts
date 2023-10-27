import { describe, expect, it } from 'vitest';
import { FloorCode } from '../../../../src/domain/floor/floorCode';

describe('FloorCode', () => {
  it('should not allow to create a code with more than 5 characters', () => {
    const result = FloorCode.create('1234ab');

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 5 characters', () => {
    const result = FloorCode.create('1234a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('1234a');
  });

  it('should allow spaces', () => {
    const result = FloorCode.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const floorCode = FloorCode.create('12a!');
    expect(floorCode.isFailure).toBe(true);
  });
});
