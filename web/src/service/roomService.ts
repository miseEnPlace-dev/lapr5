import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { Room } from "@/model/Room";

import { HttpService } from "./IService/HttpService";
import { IRoomService } from "./IService/IRoomService";

@injectable()
export class RoomService implements IRoomService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getFloorRooms(
    buildingCode: string,
    floorCode: string
  ): Promise<Room[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Room[]>(
      `/buildings/${buildingCode}/floors/${floorCode}/rooms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = response.data;
    return data;
  }
  async createRoom(
    buildingCode: string,
    floorCode: string,
    room: Room
  ): Promise<Room> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Room>(
        `/buildings/${buildingCode}/floors/${floorCode}/rooms`,
        room,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((error) => {
        throw error.message;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }
  async getRoomWithName(
    buildingCode: string,
    floorCode: string,
    roomName: string
  ): Promise<Room> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Room>(
      `/buildings/${buildingCode}/floors/${floorCode}/rooms/${roomName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = response.data;
    return data;
  }
  async getBuildingRooms(buildingCode: string): Promise<Room[]> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Room[]>(
      `/buildings/${buildingCode}/rooms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = response.data;
    return data;
  }
}
