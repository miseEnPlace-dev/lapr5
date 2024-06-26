import { Mapper } from '../core/infra/Mapper';

import { IRoomPersistence } from '@/dataschema/IRoomPersistence';
import { FloorCode } from '@/domain/floor/floorCode';
import { Room } from '@/domain/room/room';
import { RoomCategory } from '@/domain/room/roomCategory';
import { RoomDescription } from '@/domain/room/roomDescription';
import { RoomDimensions } from '@/domain/room/roomDimensions';
import { RoomDoor } from '@/domain/room/roomDoor';
import { RoomName } from '@/domain/room/roomName';
import { IRoomDTO } from '@/dto/IRoomDTO';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RoomMapper extends Mapper<Room> {
  public static toDTO(room: Room): IRoomDTO {
    return {
      name: room.name.value,
      floorCode: room.floorCode.value,
      description: room.description?.value,
      dimensions: {
        width: room.dimensions.width,
        length: room.dimensions.length
      },
      category: room.category.value,
      roomDoor: {
        x: room.roomDoor.x,
        y: room.roomDoor.y
      }
    };
  }

  public static async toDomain(room: IRoomPersistence): Promise<Room | null> {
    const name = RoomName.create(room.name).getValue();
    const { width, length } = room.dimensions;

    const repoFloor = container.get<IFloorRepo>(TYPES.floorRepo);

    const floorCode = FloorCode.create(room.floorCode).getValue();

    const floor = await repoFloor.findByCode(floorCode);
    if (!floor) throw new Error('Floor not found');

    const roomDimensionsOrError = RoomDimensions.create(width, length);

    const description = room.description
      ? RoomDescription.create(room.description).getValue()
      : undefined;

    const category = RoomCategory.create(room.category).getValue();

    const { x, y } = room.roomDoor;
    const roomDoor = RoomDoor.create(x, y).getValue();

    const roomOrError = Room.create(
      {
        name,
        description,
        dimensions: roomDimensionsOrError.getValue(),
        floorCode,
        category,
        roomDoor
      },
      new UniqueEntityID(room.domainId)
    );

    roomOrError.isFailure && console.log(roomOrError.error);

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence(room: Room): IRoomPersistence {
    return {
      domainId: room.id.toString(),
      name: room.name.value,
      description: room.description?.value,
      dimensions: {
        width: room.dimensions.width,
        length: room.dimensions.length
      },
      floorCode: room.floorCode.value,
      category: room.category.value,
      roomDoor: {
        x: room.roomDoor.x,
        y: room.roomDoor.y
      }
    };
  }
}
