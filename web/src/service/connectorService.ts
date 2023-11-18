import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { Connector } from "@/model/Connector";

import { HttpService } from "./IService/HttpService";
import { IConnectorService } from "./IService/IConnectorService";

@injectable()
export class ConnectorService implements IConnectorService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getConnectors(buildingCodes?: string[]): Promise<Connector[]> {
    const filter = buildingCodes
      ? `?buildingCodes[]=${buildingCodes[0]}&buildingCodes[]=${buildingCodes[1]}`
      : "";
    const response = await this.http.get<Connector[]>("/connectors" + filter);
    const data = response.data;
    return data;
  }

  async getConnectorWithCode(code: string): Promise<Connector> {
    const response = await this.http.get<Connector>(`/connectors/${code}`);
    const data = response.data;
    return data;
  }

  async createConnector(connector: Connector): Promise<Connector> {
    const response = await this.http
      .post<Connector>("/connectors", connector)
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateConnector(connector: Connector): Promise<Connector> {
    const res = await this.http
      .patch<Connector>(`/connectors/${connector.code}`, connector)
      .catch((e) => {
        throw e;
      });

    if (res.status !== 200) throw new Error("Error updating connector.");
    return res.data;
  }
}
