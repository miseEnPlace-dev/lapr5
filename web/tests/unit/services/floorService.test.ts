import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Floor } from "../../../src/model/Floor";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IFloorService } from "../../../src/service/IService/IFloorService";

describe("Floors Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createFloor: should return the new floor", async () => {
    const request = {
      code: "B1",
      buildingCode: "B",
      dimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const floor: Floor = {
      code: "B1",
      buildingCode: "B",
      dimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const floorSvc = container.get<IFloorService>(TYPES.floorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: floor,
    });

    const result = await floorSvc.createFloor("B1", request);
    expect(result).toEqual(floor);
  });

  it("createFloor: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Floor;

    const floorSvc = container.get<IFloorService>(TYPES.floorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await floorSvc.createFloor("B1", request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getFloors: should return the floors array", async () => {
    const floors: Floor[] = [
      {
        code: "B1",
        buildingCode: "B",
        dimensions: {
          width: 20,
          length: 20,
        },
        description: "Edifício B",
      },
    ];

    const floorSvc = container.get<IFloorService>(TYPES.floorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: floors,
    });

    const result = await floorSvc.getAllFloors();
    expect(result).toEqual(floors);
  });

  it("updateFloor: should return the updated floor", async () => {
    const floor: Floor = {
      code: "B1",
      buildingCode: "B",
      dimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const floorSvc = container.get<IFloorService>(TYPES.floorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 200,
      statusText: "OK",
      data: floor,
    });

    const result = await floorSvc.updateFloor("B1", floor);
    expect(result).toEqual(floor);
  });

  it("updateFloor: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Floor;

    const floorSvc = container.get<IFloorService>(TYPES.floorService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await floorSvc.updateFloor("B1", request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });
});
