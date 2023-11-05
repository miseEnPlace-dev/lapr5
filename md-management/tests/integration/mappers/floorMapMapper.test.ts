import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { FloorMap } from '../../../src/domain/floor/floorMap/floorMap';
import { FloorMapSize } from '../../../src/domain/floor/floorMap/floorMapSize';
import { FloorMapMatrix } from '../../../src/domain/floor/floorMap/floorMapMatrix';
import { FloorMapExits } from '../../../src/domain/floor/floorMap/floorMapExits';
import { FloorMapElevators } from '../../../src/domain/floor/floorMap/floorMapElevators';
import { FloorMapExitLocation } from '../../../src/domain/floor/floorMap/floorMapExitLocation';
import { container } from '../../../src/loaders/inversify';
import { FloorMapMapper } from '../../../src/mappers/FloorMapMapper';

describe('FloorMap Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a floorMap to a dto', () => {
    const floorMapDTO = {
      size: {
        width: 2,
        depth: 2
      },
      map: [
        [1, 2],
        [3, 0]
      ],
      exits: [[1, 2]],
      elevators: [[1, 2]],
      exitLocation: [1, 2]
    };

    const floorMap = FloorMap.create({
      size: FloorMapSize.create(2, 2).getValue(),
      map: FloorMapMatrix.create([
        [1, 2],
        [3, 0]
      ]).getValue(),
      exits: FloorMapExits.create([{ x: 1, y: 2 }]).getValue(),
      elevators: FloorMapElevators.create([{ x: 1, y: 2 }]).getValue(),
      exitLocation: FloorMapExitLocation.create(1, 2).getValue()
    });

    const result = FloorMapMapper.toDTO(floorMap.getValue());

    expect(result).toEqual(floorMapDTO);
  });

  it('should map a floorMap to persistence', () => {
    const floorMap = FloorMap.create(
      {
        size: FloorMapSize.create(2, 2).getValue(),
        map: FloorMapMatrix.create([
          [1, 2],
          [3, 0]
        ]).getValue(),
        exits: FloorMapExits.create([{ x: 1, y: 2 }]).getValue(),
        elevators: FloorMapElevators.create([{ x: 1, y: 2 }]).getValue(),
        exitLocation: FloorMapExitLocation.create(1, 2).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = FloorMapMapper.toPersistence(floorMap.getValue());

    expect(result).toEqual({
      domainId: '1',
      size: {
        width: 2,
        depth: 2
      },
      map: [
        [1, 2],
        [3, 0]
      ],
      exits: [{ x: 1, y: 2 }],
      elevators: [{ x: 1, y: 2 }],
      exitLocation: { x: 1, y: 2 }
    });
  });

  it('should map a floorMap from persistence', async () => {
    const result = await FloorMapMapper.toDomain({
      domainId: '1',
      size: {
        width: 2,
        depth: 2
      },
      map: [
        [1, 2],
        [3, 0]
      ],
      exits: [[1, 2]],
      elevators: [[1, 2]],
      exitLocation: { x: 1, y: 2 }
    });

    expect(result.size).toEqual(FloorMapSize.create(2, 2).getValue());
    expect(result.map).toEqual(
      FloorMapMatrix.create([
        [1, 2],
        [3, 0]
      ]).getValue()
    );
    expect(result.elevators.elevators).toEqual([[1, 2]]);
    expect(result.exits.exits).toEqual([[1, 2]]);
    expect(result.exitLocation.x).toEqual(1);
    expect(result.exitLocation.y).toEqual(2);
    expect(result.id).toEqual(UniqueEntityID.create('1'));
  });
});
