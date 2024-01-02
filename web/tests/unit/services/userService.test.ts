import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { User } from "../../../src/model/User";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IUserService } from "../../../src/service/IService/IUserService";

describe("Users Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("should allow user signup", async () => {
    const request = {
      firstName: "User",
      lastName: "Test",
      email: "test@isep.ipp.pt",
      password: "abc123456",
      nif: "123456789",
      phoneNumber: "912345678",
      role: "user",
    };

    const user: Omit<User, "id"> = {
      firstName: "User",
      lastName: "Test",
      email: "test@isep.ipp.pt",
      password: "abc123456",
      nif: "123456789",
      phoneNumber: "912345678",
      role: "user",
    };

    const service = container.get<IUserService>(TYPES.userService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: user,
    });

    const result = await service.register(request);
    expect(result).toEqual(user);
  });

  it("should allow list users", async () => {
    const user: User = {
      id: "123",
      firstName: "User",
      lastName: "Test",
      email: "test@isep.ipp.pt",
      password: "abc123456",
      nif: "123456789",
      phoneNumber: "912345678",
      role: "user",
    };

    const service = container.get<IUserService>(TYPES.userService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: user,
    });

    const result = await service.getAllUsers();
    expect(result).toEqual(user);
  });

  it("should allow accept user request", async () => {
    const service = container.get<IUserService>(TYPES.userService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 204,
      statusText: "No Content",
      data: null,
    });

    await service.acceptRequest("1221");
  });

  it("should allow reject user request", async () => {
    const service = container.get<IUserService>(TYPES.userService);

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 204,
      statusText: "No Content",
      data: null,
    });

    await service.acceptRequest("1221");
  });
});
