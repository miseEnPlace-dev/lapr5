import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { DeviceModel } from "../../../src/model/DeviceModel";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IDeviceModelService } from "../../../src/service/IService/IDeviceModelService";

describe("DeviceModel Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createDeviceModel: should return the new deviceModel", async () => {
    const request = {
      code: "DEVM1",
      brand: "Brand 1",
      name: "DeviceModel 1",
      type: "robot",
      capabilities: ["pick_delivery", "surveillance"],
    } as DeviceModel;

    const deviceModel: DeviceModel = {
      code: "DEVM1",
      brand: "Brand 1",
      name: "DeviceModel 1",
      type: "robot",
      capabilities: ["pick_delivery", "surveillance"],
    };

    const deviceModelSvc = container.get<IDeviceModelService>(
      TYPES.deviceModelService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: deviceModel,
    });

    const result = await deviceModelSvc.createDeviceModel(request);
    expect(result).toEqual(deviceModel);
  });

  it("createDeviceModel: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as DeviceModel;

    const deviceModelSvc = container.get<IDeviceModelService>(
      TYPES.deviceModelService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await deviceModelSvc.createDeviceModel(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getDeviceModels: should return the deviceModels array", async () => {
    const deviceModels: DeviceModel[] = [
      {
        code: "DEVM1",
        brand: "Brand 1",
        name: "DeviceModel 1",
        type: "robot",
        capabilities: ["pick_delivery", "surveillance"],
      },
    ];

    const deviceModelSvc = container.get<IDeviceModelService>(
      TYPES.deviceModelService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: deviceModels,
    });

    const result = await deviceModelSvc.getDeviceModels();
    expect(result).toEqual(deviceModels);
  });

  it("updateDeviceModel: should return the updated deviceModel", async () => {
    const deviceModel: DeviceModel = {
      code: "DEVM1",
      brand: "Brand 1",
      name: "DeviceModel 1",
      type: "robot",
      capabilities: ["pick_delivery", "surveillance"],
    };

    const deviceModelSvc = container.get<IDeviceModelService>(
      TYPES.deviceModelService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 200,
      statusText: "OK",
      data: deviceModel,
    });

    const result = await deviceModelSvc.updateDeviceModel(deviceModel);
    expect(result).toEqual(deviceModel);
  });

  it("updateDeviceModel: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as DeviceModel;

    const deviceModelSvc = container.get<IDeviceModelService>(
      TYPES.deviceModelService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "put").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await deviceModelSvc.updateDeviceModel(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });
});
