import { Repo } from '../../core/infra/Repo';
import { Room } from '@/domain/room/room';
import { FloorCode } from '@/domain/floor/floorCode';

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findAllRoomsInFloorByCode(floorId: FloorCode): Promise<Room[] | null>;
}
