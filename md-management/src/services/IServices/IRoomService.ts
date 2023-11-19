import { Result } from '@/core/logic/Result';
import { FloorCode } from '@/domain/floor/floorCode';
import { IRoomDTO } from '@/dto/IRoomDTO';

export default interface IFloorService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getFloorRooms(floorCode: string): Promise<Result<IRoomDTO[]>>;
  getAvailableAreaInFloor(floorCode: FloorCode): Promise<Result<number>>;
}
