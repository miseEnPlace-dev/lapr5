import { Mapper } from '../core/infra/Mapper';

import { IRoomPersistence } from '@/dataschema/IRoomPersistence';
import { Room } from '@/domain/room/room';
import { RoomCategory } from '@/domain/room/roomCategory';
import { RoomDescription } from '@/domain/room/roomDescription';
import { RoomDimensions } from '@/domain/room/roomDimensions';
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
      floorCode: room.floor.code.value,
      description: room.description?.value,
      dimensions: {
        width: room.dimensions.width,
        length: room.dimensions.length
      },
      category: room.category.value
    };
  }

  public static async toDomain(room: IRoomPersistence): Promise<Room | null> {
    const name = RoomName.create(room.name).getValue();
    const { width, length } = room.dimensions;

    const repoFloor = container.get<IFloorRepo>(TYPES.floorRepo);

    const floor = await repoFloor.findByDomainId(room.floor);
    if (!floor) throw new Error('Floor not found');

    const roomDimensionsOrError = RoomDimensions.create(width, length);

    const description = room.description
      ? RoomDescription.create(room.description).getValue()
      : undefined;

    const category = RoomCategory.create(room.category).getValue();

    const roomOrError = Room.create(
      {
        name,
        description,
        dimensions: roomDimensionsOrError.getValue(),
        floor,
        category
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
      floor: room.floor.id.toString(),
      category: room.category.value
    };
  }
}
