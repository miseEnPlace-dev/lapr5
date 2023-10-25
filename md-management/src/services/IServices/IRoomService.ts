import { Result } from '@/core/logic/Result';
import { IRoomDTO } from '@/dto/IRoomDTO';

export default interface IFloorService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
}
