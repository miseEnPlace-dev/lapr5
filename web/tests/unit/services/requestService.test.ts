import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IRequestService } from "../../../src/service/IService/IRequestService";

describe("Room Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("acceptRequest: should return the request", async () => {
    const requestSvc = container.get<IRequestService>(TYPES.requestService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 200,
      statusText: "OK",
      data: {},
    });

    const result = await requestSvc.acceptRequest("12345", "23456");
    expect(result).toEqual({});
  });

  it("rejectRequest: should return the request", async () => {
    const requestSvc = container.get<IRequestService>(TYPES.requestService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 200,
      statusText: "OK",
      data: {},
    });

    const result = await requestSvc.rejectRequest("12345");
    expect(result).toEqual({});
  });
});
