import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { Result } from '@/core/logic/Result';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IRoomService from './IServices/IRoomService';
import IRoomRepo from './IRepos/IRoomRepo';
import { IRoomDTO } from '@/dto/IRoomDTO';
import { RoomName } from '@/domain/room/roomName';
import { RoomDescription } from '@/domain/room/roomDescription';
import { Room } from '@/domain/room/room';
import { RoomDimensions } from '@/domain/room/roomDimensions';
import { RoomMap } from '@/mappers/RoomMap';
import { FloorCode } from '@/domain/floor/floorCode';

@Service()
export default class RoomService implements IRoomService {
  private roomRepo: IRoomRepo;
  private floorRepo: IFloorRepo;
  constructor() {
    this.floorRepo = Container.get(config.repos.floor.name);
    this.roomRepo = Container.get(config.repos.room.name);
  }

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const name = RoomName.create(roomDTO.name);

      if (name.isFailure) return Result.fail<IRoomDTO>(name.error as string);

      const description = roomDTO.description
        ? RoomDescription.create(roomDTO.description)
        : undefined;

      const floor = await this.floorRepo.findByCode(roomDTO.floorCode);
      if (!floor) return Result.fail<IRoomDTO>('Floor does not exist');

      if (
        !roomDTO.dimensions ||
        !roomDTO.dimensions.width ||
        !roomDTO.dimensions.height ||
        roomDTO.dimensions.width > floor.dimensions.width ||
        roomDTO.dimensions.height > floor.dimensions.height
      )
        return Result.fail<IRoomDTO>(
          'Room dimensions are invalid or there is no space in current floor'
        );

      if (
        (await this.getAvailableAreaInFloor(floor.props.code)).getValue() >=
        roomDTO.dimensions.width * roomDTO.dimensions.height
      ) {
        const dimensions = RoomDimensions.create(
          roomDTO.dimensions.width,
          roomDTO.dimensions.height
        );

        if (dimensions.isFailure) return Result.fail<IRoomDTO>(dimensions.error);

        const roomOrError = Room.create({
          name: name.getValue(),
          description: description?.getValue(),
          dimensions: dimensions.getValue(),
          floor
        });

        if (roomOrError.isFailure) return Result.fail<IRoomDTO>(roomOrError.error as string);

        const roomResult = roomOrError.getValue();

        await this.roomRepo.save(roomResult);

        const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
        return Result.ok<IRoomDTO>(roomDTOResult);
      }

      return Result.fail<IRoomDTO>('Room dimensions are invalid');
    } catch (e) {
      throw e;
    }
  }

  public async getAvailableAreaInFloor(floorCode: FloorCode): Promise<Result<number>> {
    try {
      const floor = await this.floorRepo.findByCode(floorCode.value);

      if (!floor) return Result.fail<number>('Floor does not exist');

      const rooms = await this.roomRepo.findAllRoomsInFloorByCode(floor.props.code);

      if (!rooms) return Result.ok<number>(floor.dimensions.width * floor.dimensions.height);

      const occupiedArea = rooms.reduce((acc, room) => {
        return acc + room.dimensions.width * room.dimensions.height;
      }, 0);

      return Result.ok<number>(floor.dimensions.width * floor.dimensions.height - occupiedArea);
    } catch (e) {
      throw e;
    }
  }
}
