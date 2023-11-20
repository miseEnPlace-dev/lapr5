import { Repo } from '../../core/infra/Repo';
import { Room } from '@/domain/room/room';
import { FloorCode } from '@/domain/floor/floorCode';
import { RoomName } from '@/domain/room/roomName';
import { Floor } from '@/domain/floor/floor';

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findAllRoomsInFloorByCode(floorCode: FloorCode): Promise<Room[] | null>;
  findAllRoomsByFloor(floor: Floor): Promise<Room[] | null>;
  findByName(name: RoomName): Promise<Room | null>;
  findAll(): Promise<Room[] | null>;
}
