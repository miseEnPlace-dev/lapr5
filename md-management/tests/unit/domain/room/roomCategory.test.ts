import { RoomCategory } from '../../../../src/domain/room/roomCategory';
import { describe, expect, it } from 'vitest';

describe('RoomCategory', () => {
  it('should not allow to create with an empty room category', () => {
    const result = RoomCategory.create('');
    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create with a non exiting room category', () => {
    const result = RoomCategory.create('non-existing-category');
    expect(result.isFailure).toBe(true);
  });

  it('should allow to create with room category OFFICE', () => {
    const result = RoomCategory.create('OFFICE');
    expect(result.isSuccess).toBe(true);
  });

  it('should allow to create with room category LAB', () => {
    const result = RoomCategory.create('LAB');
    expect(result.isSuccess).toBe(true);
  });

  it('should allow to create with room category MEETING_ROOM', () => {
    const result = RoomCategory.create('MEETING_ROOM');
    expect(result.isSuccess).toBe(true);
  });

  it('should allow to create with room category CLASSROOM', () => {
    const result = RoomCategory.create('CLASSROOM');
    expect(result.isSuccess).toBe(true);
  });
});
