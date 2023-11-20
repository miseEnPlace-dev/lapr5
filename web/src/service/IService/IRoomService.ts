import { Room } from "@/model/Room";

export interface IRoomService {
  getFloorRooms(buildingCode: string, floorCode: string): Promise<Room[]>;
  createRoom(buildingCode: string, floorCode: string, room: Room): Promise<Room>;
  //getRoomWithName(name: string): Promise<Room>;
}
