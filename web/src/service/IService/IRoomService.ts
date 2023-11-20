import { Room } from "@/model/Room";

export interface IRoomService {
  getFloorRooms(buildingCode: string, floorCode: string): Promise<Room[]>;
  createRoom(buildingCode: string, floorCode: string, room: Room): Promise<Room>;
  getRoomWithName(buildingCode: string, floorCode: string, roomName: string): Promise<Room>;
}
