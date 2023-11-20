import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";

import { HttpService } from "./IService/HttpService";
import { IRoomService } from "./IService/IRoomService";
import { Room } from "@/model/Room";

@injectable()
export class RoomService implements IRoomService {
  constructor(@inject(TYPES.api) private http: HttpService) { }

  async getFloorRooms(buildingCode: string, floorCode: string): Promise<Room[]> {
    const response = await this.http.get<Room[]>(`/buildings/${buildingCode}/floors/${floorCode}/rooms`);

    const data = response.data;
    return data;
  }
  async createRoom(buildingCode: string, floorCode: string, room: Room): Promise<Room> {
    const response = await this.http.post<Room>(
      `/buildings/${buildingCode}/floors/${floorCode}/rooms`,
      room
    );

    const data = response.data;
    return data;
  }
  async getRoomWithName(buildingCode: string, floorCode: string, roomName: string): Promise<Room> {
    const response = await this.http.get<Room>(`/buildings/${buildingCode}/floors/${floorCode}/rooms/${roomName}`);

    const data = response.data;
    return data;
  }
}
