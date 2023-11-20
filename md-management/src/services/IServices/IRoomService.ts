import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { FloorCode } from '@/domain/floor/floorCode';
import { IRoomDTO } from '@/dto/IRoomDTO';

export default interface IFloorService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getFloorRooms(buildingCode: string, floorCode: string): Promise<Result<IRoomDTO[]>>;
  getAvailableAreaInFloor(
    buildingCode: BuildingCode,
    floorCode: FloorCode
  ): Promise<Result<number>>;
  getRoom(buildingCode: string, floorCode: string, roomName: string): Promise<Result<IRoomDTO>>;
}
