import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Floor } from "../../../src/model/Floor";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IFloorService } from "../../../src/service/IService/IFloorService";
import { Elevator } from "../../../src/model/Elevator";
import { IElevatorService } from "../../../src/service/IService/IElevatorService";

describe("Elevator Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createElevator: should return the new elevator", async () => {
    const request = {
      code: "elev1",
      floorCodes: ["B1"],
      description: "Elevador do edifício B",
    };

    const elevator: Elevator = {
      code: "elev1",
      floorCodes: ["B1"],
      description: "Elevador do edifício B",
    };

    const elevatorSvc = container.get<IElevatorService>(TYPES.elevatorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: elevator,
    });

    const result = await elevatorSvc.createElevator("B1", request);
    expect(result).toEqual(elevator);
  });

  it("createElevator: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Elevator;

    const elevatorSvc = container.get<IElevatorService>(TYPES.elevatorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await elevatorSvc.createElevator("B1", request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getElevator: should return the elevator of building", async () => {
    const elevator: Elevator[] = [
      {
        code: "elev1",
        floorCodes: ["B1"],
        description: "Elevador do edifício B",
      },
    ];

    const elevSvc = container.get<IElevatorService>(TYPES.elevatorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: elevator,
    });

    const result = await elevSvc.getBuildingElevator("B");
    expect(result).toEqual(elevator);
  });
});
