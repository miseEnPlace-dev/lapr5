import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Building } from '../../../src/domain/building/building';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { BuildingDescription } from '../../../src/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '../../../src/domain/building/buildingMaxDimensions';
import { BuildingName } from '../../../src/domain/building/buildingName';
import { container } from '../../../src/loaders/inversify';
import { BuildingMapper } from '../../../src/mappers/BuildingMapper';

describe('Building Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map an building to a dto', () => {
    const buildingDTO = {
      code: '1',
      maxDimensions: {
        width: 1,
        length: 1
      },
      description: 'description',
      name: 'name'
    };

    const building = Building.create({
      code: BuildingCode.create('1').getValue(),
      maxDimensions: BuildingMaxDimensions.create(1, 1).getValue(),
      description: BuildingDescription.create('description').getValue(),
      name: BuildingName.create('name').getValue()
    });

    const result = BuildingMapper.toDTO(building.getValue());

    expect(result).toEqual(buildingDTO);
  });

  it('should map an building to persistence', () => {
    const building = Building.create(
      {
        code: BuildingCode.create('1').getValue(),
        maxDimensions: BuildingMaxDimensions.create(1, 1).getValue(),
        description: BuildingDescription.create('description').getValue(),
        name: BuildingName.create('name').getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = BuildingMapper.toPersistence(building.getValue());

    expect(result).toEqual({
      domainId: '1',
      code: '1',
      maxDimensions: {
        width: 1,
        length: 1
      },
      description: 'description',
      name: 'name'
    });
  });

  it('should map an building from persistence', async () => {
    const building = Building.create(
      {
        code: BuildingCode.create('1').getValue(),
        maxDimensions: BuildingMaxDimensions.create(1, 1).getValue(),
        description: BuildingDescription.create('description').getValue(),
        name: BuildingName.create('name').getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = await BuildingMapper.toDomain({
      domainId: '1',
      code: '1',
      maxDimensions: {
        width: 1,
        length: 1
      },
      description: 'description',
      name: 'name'
    });

    expect(result).toEqual(building.getValue());
  });
});
