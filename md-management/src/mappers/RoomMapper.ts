import { Mapper } from '../core/infra/Mapper';

import config from '@/config.mjs';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IRoomDTO } from '@/dto/IRoomDTO';
import { Room } from '@/domain/room/room';
import { IRoomPersistence } from '@/dataschema/IRoomPersistence';
import { RoomName } from '@/domain/room/roomName';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import { RoomDescription } from '@/domain/room/roomDescription';
import { RoomDimensions } from '@/domain/room/roomDimensions';
import Container from 'typedi';

export class RoomMapper extends Mapper<Room> {
  public static toDTO(room: Room): IRoomDTO {
    return {
      name: room.name.value,
      floorCode: room.floor.code.value,
      description: room.description?.value,
      dimensions: {
        width: room.dimensions.width,
        height: room.dimensions.height
      }
    };
  }

  public static async toDomain(room: IRoomPersistence): Promise<Room | null> {
    const name = RoomName.create(room.name).getValue();
    const { width, height } = room.dimensions;

    const repoFloor = Container.get<IFloorRepo>(config.repos.floor.name);

    const floor = await repoFloor.findByDomainId(room.floor);
    if (!floor) throw new Error('Floor not found');

    const roomDimensionsOrError = RoomDimensions.create(width, height);

    const description = room.description
      ? RoomDescription.create(room.description).getValue()
      : undefined;

    const roomOrError = Room.create(
      {
        name,
        description,
        dimensions: roomDimensionsOrError.getValue(),
        floor
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
        height: room.dimensions.height
      },
      floor: room.floor.id.toString()
    };
  }
}
