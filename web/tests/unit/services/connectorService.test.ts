import "reflect-metadata";

import sinon, { stub } from "sinon";
import { beforeEach, describe, expect, it } from "vitest";

import { TYPES } from "../../../src/inversify/types";

import { container } from "../../../src/inversify";
import { Connector } from "../../../src/model/Connector";
import { HttpService } from "../../../src/service/IService/HttpService";
import { IConnectorService } from "../../../src/service/IService/IConnectorService";

describe("Connector Service", () => {
  beforeEach(() => {
    process.env.environment = "test";
    sinon.restore();
  });

  it("createConnector: should return the new connector", async () => {
    const request = {
      code: "B1C1",
      floor1Code: "B1",
      floor2Code: "C1",
    };

    const connector: Connector = {
      code: "B1C1",
      floor1Code: "B1",
      floor2Code: "C1",
    };

    const connectorSvc = container.get<IConnectorService>(
      TYPES.connectorService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 201,
      statusText: "Created",
      data: connector,
    });

    const result = await connectorSvc.createConnector(request);
    expect(result).toEqual(connector);
  });

  it("createConnector: should return 400", async () => {
    const request = {
      code: "aaaaa",
    };

    const connectorSvc = container.get<IConnectorService>(
      TYPES.connectorService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "post").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await connectorSvc.createConnector(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Something went wrong");
    }
  });

  it("getConnectors: should return the connectors array", async () => {
    const connectors: Connector[] = [
      {
        code: "B1C1",
        floor1Code: "B1",
        floor2Code: "C1",
      },
    ];

    const connectorSvc = container.get<IConnectorService>(
      TYPES.connectorService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "get").resolves({
      status: 200,
      statusText: "OK",
      data: connectors,
    });

    const result = await connectorSvc.getConnectors();
    expect(result).toEqual(connectors);
  });

  it("updateConnector: should return the updated connector", async () => {
    const connector: Connector = {
      code: "B1C1",
      floor1Code: "B2",
      floor2Code: "C2",
    };

    const connectorSvc = container.get<IConnectorService>(
      TYPES.connectorService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 200,
      statusText: "OK",
      data: connector,
    });

    const result = await connectorSvc.updateConnector(connector);
    expect(result).toEqual(connector);
  });

  it("updateConnector: should return 400", async () => {
    const request = {
      code: "aaaaa",
    };

    const connectorSvc = container.get<IConnectorService>(
      TYPES.connectorService
    );

    const http = container.get<HttpService>(TYPES.api);
    stub(http, "patch").resolves({
      status: 400,
      statusText: "Bad Request",
      data: { error: "Something went wrong" },
    });

    try {
      await connectorSvc.updateConnector(request);
      // fail if it doesn't throw
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Error updating connector.");
    }
  });
});
