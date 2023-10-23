import { describe, expect, it } from 'vitest';
import { BuildingDescription } from '../../../../src/domain/building/buildingDescription';

describe('BuildingDescription', () => {
  it('should not allow to create a description with more than 255 characters', () => {
    const result = BuildingDescription.create([...Array(256)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new description with 255 characters', () => {
    const result = BuildingDescription.create([...Array(255)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(255)].map(() => 'a').join(''));
  });
});
