import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Floor } from '../../../src/domain/floor/floor';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { container } from '../../../src/loaders/inversify';
import { FloorMapper } from '../../../src/mappers/FloorMapper';

describe('Floor Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a floor to a dto', () => {
    const floorDto = {
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 1,
        length: 1
      }
    };

    const floor = Floor.create({
      code: FloorCode.create('1').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    });

    const result = FloorMapper.toDTO(floor.getValue());

    expect(result).toEqual(floorDto);
  });

  it('should map a floor to persistence', () => {
    const floor = Floor.create(
      {
        code: FloorCode.create('1').getValue(),
        buildingCode: BuildingCode.create('1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = FloorMapper.toPersistence(floor.getValue());

    expect(result).toEqual({
      domainId: '1',
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 1,
        length: 1
      }
    });
  });

  it('should map a floor from persistence', async () => {
    const floor = Floor.create(
      {
        code: FloorCode.create('1').getValue(),
        buildingCode: BuildingCode.create('1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = await FloorMapper.toDomain({
      domainId: '1',
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 1,
        length: 1
      }
    });

    expect(result).toEqual(floor.getValue());
  });
});
