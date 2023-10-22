import { describe, expect, it } from 'vitest';
import { BuildingName } from '../../../../src/domain/building/buildingName';

describe('BuildingName', () => {
  it('should not allow to create a description with more than 50 characters', () => {
    const result = BuildingName.create([...Array(256)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new description with 50 characters', () => {
    const result = BuildingName.create([...Array(50)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(50)].map(() => 'a').join(''));
  });
});
