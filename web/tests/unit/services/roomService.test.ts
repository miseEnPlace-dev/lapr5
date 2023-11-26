import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Room } from "../../../src/model/Room";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IRoomService } from "../../../src/service/IService/IRoomService";

describe("Room Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createRoom: should return the new room", async () => {
    const request = {
      name: "Sala B103",
      dimensions: {
        width: 20,
        length: 20,
      },
      floorCode: "B1",
      category: "LAB",
    };

    const room: Room = {
      name: "Sala B103",
      dimensions: {
        width: 20,
        length: 20,
      },
      floorCode: "B1",
      category: "LAB",
    };

    const roomSvc = container.get<IRoomService>(TYPES.roomService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: room,
    });

    const result = await roomSvc.createRoom("B1", "B", request);
    expect(result).toEqual(room);
  });

  it("createRoom: should return 400", async () => {
    const request = {
      name: "aaaaa",
    } as Room;

    const roomSvc = container.get<IRoomService>(TYPES.roomService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await roomSvc.createRoom("B1", "B", request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getRoomWithName: should return the rooms array", async () => {
    const rooms: Room[] = [
      {
        name: "Sala B103",
        dimensions: {
          width: 20,
          length: 20,
        },
        floorCode: "B1",
        category: "LAB",
      },
    ];

    const roomSvc = container.get<IRoomService>(TYPES.roomService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: rooms,
    });

    const result = await roomSvc.getRoomWithName("B1", "B", "Sala B103");
    expect(result).toEqual(rooms);
  });
});
