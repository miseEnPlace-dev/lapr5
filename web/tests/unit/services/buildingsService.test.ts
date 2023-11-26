import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Building } from "../../../src/model/Building";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IBuildingService } from "../../../src/service/IService/IBuildingService";

describe("Buildings Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createBuilding: should return the new building", async () => {
    const request = {
      code: "B",
      name: "Edifício B",
      maxDimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const building: Building = {
      code: "B",
      name: "Edifício B",
      maxDimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const buildingSvc = container.get<IBuildingService>(TYPES.buildingService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: building,
    });

    const result = await buildingSvc.createBuilding(request);
    expect(result).toEqual(building);
  });

  it("createBuilding: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Building;

    const buildingSvc = container.get<IBuildingService>(TYPES.buildingService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await buildingSvc.createBuilding(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getBuildings: should return the buildings array", async () => {
    const buildings: Building[] = [
      {
        code: "B",
        name: "Edifício B",
        maxDimensions: {
          width: 20,
          length: 20,
        },
        description: "Edifício B",
      },
    ];

    const buildingSvc = container.get<IBuildingService>(TYPES.buildingService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: buildings,
    });

    const result = await buildingSvc.getBuildings();
    expect(result).toEqual(buildings);
  });

  it("updateBuilding: should return the updated building", async () => {
    const building: Building = {
      code: "B",
      name: "Edifício B",
      maxDimensions: {
        width: 20,
        length: 20,
      },
      description: "Edifício B",
    };

    const buildingSvc = container.get<IBuildingService>(TYPES.buildingService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 200,
      statusText: "OK",
      data: building,
    });

    const result = await buildingSvc.updateBuilding(building);
    expect(result).toEqual(building);
  });

  it("updateBuilding: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Building;

    const buildingSvc = container.get<IBuildingService>(TYPES.buildingService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await buildingSvc.updateBuilding(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });
});
