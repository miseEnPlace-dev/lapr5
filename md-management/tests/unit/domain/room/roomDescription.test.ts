import { describe, expect, it } from 'vitest';
import { RoomDescription } from '../../../../src/domain/room/roomDescription';

describe('RoomDescription', () => {
  it('should not allow to create a description with more than 255 characters', () => {
    const result = RoomDescription.create([...Array(256)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new description with 255 characters', () => {
    const result = RoomDescription.create([...Array(255)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(255)].map(() => 'a').join(''));
  });
});
