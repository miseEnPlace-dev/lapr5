import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Device } from "../../../src/model/Device";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IDeviceService } from "../../../src/service/IService/IDeviceService";

describe("Device Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("createDevice: should return the new device", async () => {
    const request = {
      code: "DEV1",
      nickname: "Device 1",
      modelCode: "DEVM1",
      serialNumber: "ABC",
      isAvailable: true,
    };

    const device: Device = {
      code: "DEV1",
      nickname: "Device 1",
      modelCode: "DEVM1",
      serialNumber: "ABC",
      isAvailable: true,
    };

    const deviceSvc = container.get<IDeviceService>(TYPES.deviceService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: device,
    });

    const result = await deviceSvc.createDevice(request);
    expect(result).toEqual(device);
  });

  it("createDevice: should return 400", async () => {
    const request = {
      code: "aaaaa",
    } as Device;

    const deviceSvc = container.get<IDeviceService>(TYPES.deviceService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await deviceSvc.createDevice(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getDevice: should return the devices array", async () => {
    const devices: Device[] = [
      {
        code: "DEV1",
        nickname: "Device 1",
        modelCode: "DEVM1",
        serialNumber: "ABC",
        isAvailable: true,
      },
    ];

    const deviceSvc = container.get<IDeviceService>(TYPES.deviceService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: devices,
    });

    const result = await deviceSvc.getDevice("DEV1");
    expect(result).toEqual(devices);
  });
});
