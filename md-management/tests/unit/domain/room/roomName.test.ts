import { describe, expect, it } from 'vitest';
import { RoomName } from '../../../../src/domain/room/roomName';

describe('RoomName', () => {
  it('should not allow to create a description with more than 50 characters', () => {
    const result = RoomName.create([...Array(256)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new description with 50 characters', () => {
    const result = RoomName.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });
});
