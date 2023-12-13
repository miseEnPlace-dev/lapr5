import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Room } from '../../../src/domain/room/room';
import { RoomName } from '../../../src/domain/room/roomName';
import { RoomDimensions } from '../../../src/domain/room/roomDimensions';
import { RoomCategory } from '../../../src/domain/room/roomCategory';
import { Floor } from '../../../src/domain/floor/floor';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { container } from '../../../src/loaders/inversify';
import { RoomMapper } from '../../../src/mappers/RoomMapper';
import { TYPES } from '../../../src/loaders/inversify/types';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';

import { stub } from 'sinon';
import { RoomDoor } from '../../../src/domain/room/roomDoor';

describe('Room Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a room to a dto', () => {
    const roomDto = {
      name: 'name',
      dimensions: {
        width: 1,
        length: 1
      },
      category: 'OFFICE',
      floorCode: '1',
      roomDoor: {
        x: 1,
        y: 1
      }
    };

    const room = Room.create({
      name: RoomName.create('name').getValue(),
      dimensions: RoomDimensions.create(1, 1).getValue(),
      category: RoomCategory.create('OFFICE').getValue(),
      floorCode: FloorCode.create('1').getValue(),
      roomDoor: RoomDoor.create(1, 1).getValue()
    });

    const result = RoomMapper.toDTO(room.getValue());

    expect(result).toEqual(roomDto);
  });

  it('should map a room to persistence', () => {
    const room = Room.create(
      {
        name: RoomName.create('name').getValue(),
        dimensions: RoomDimensions.create(1, 1).getValue(),
        category: RoomCategory.create('OFFICE').getValue(),
        floorCode: FloorCode.create('1').getValue(),
        roomDoor: RoomDoor.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = RoomMapper.toPersistence(room.getValue());

    expect(result).toEqual({
      domainId: '1',
      name: 'name',
      description: undefined,
      dimensions: {
        width: 1,
        length: 1
      },
      category: 'OFFICE',
      floorCode: '1',
      roomDoor: {
        x: 1,
        y: 1
      }
    });
  });

  it('should map a room from persistence', async () => {
    const floorCode: FloorCode = FloorCode.create('1').getValue();
    const floor = Floor.create(
      {
        code: floorCode,
        buildingCode: BuildingCode.create('1').getValue(),
        dimensions: FloorDimensions.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    ).getValue();

    const room = Room.create(
      {
        name: RoomName.create('name').getValue(),
        dimensions: RoomDimensions.create(1, 1).getValue(),
        category: RoomCategory.create('OFFICE').getValue(),
        floorCode: floorCode,
        roomDoor: RoomDoor.create(1, 1).getValue()
      },
      UniqueEntityID.create('1')
    );

    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepoStub, 'findByCode').resolves(floor);
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    const result = await RoomMapper.toDomain({
      domainId: '1',
      name: 'name',
      description: undefined,
      dimensions: {
        width: 1,
        length: 1
      },
      category: 'OFFICE',
      floorCode: '1',
      roomDoor: {
        x: 1,
        y: 1
      }
    });

    expect(result).toEqual(room.getValue());
  });

  it('should throw an error when floor is not found', async () => {
    const floorRepoStub = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepoStub, 'findByCode').resolves(undefined);
    container.unbind(TYPES.floorRepo);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorRepoStub);

    await expect(
      RoomMapper.toDomain({
        domainId: '1',
        name: 'name',
        description: undefined,
        dimensions: {
          width: 1,
          length: 1
        },
        category: 'OFFICE',
        floorCode: '1',
        roomDoor: {
          x: 1,
          y: 1
        }
      })
    ).rejects.toThrowError('Floor not found');
  });
});
