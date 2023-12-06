import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Connector } from "@/model/Connector";

import { HttpService } from "./IService/HttpService";
import { IConnectorService } from "./IService/IConnectorService";

@injectable()
export class ConnectorService implements IConnectorService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getConnectors(
    buildingCodes?: string[],
    page: number = 0,
    limit: number = 2
  ): Promise<IPaginationDTO<Connector>> {
    const params = {} as { [key: string]: string };
    if (buildingCodes) {
      params["buildingCodes[0]"] = buildingCodes[0];
      params["buildingCodes[1]"] = buildingCodes[1];
    }
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }

    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<IPaginationDTO<Connector>>(
      "/connectors",
      { params, headers: { Authorization: `Bearer ${token}` } }
    );
    const data = response.data;
    return data;
  }

  async getConnectorWithCode(code: string): Promise<Connector> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<Connector>(`/connectors/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  }

  async createConnector(connector: Connector): Promise<Connector> {
    const token = localStorage.getItem(localStorageConfig.token);

    const response = await this.http
      .post<Connector>("/connectors", connector, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        throw error;
      });

    if (response.status === 400) throw new Error("Something went wrong");

    const data = response.data;
    return data;
  }

  async updateConnector(connector: Connector): Promise<Connector> {
    const token = localStorage.getItem(localStorageConfig.token);

    const res = await this.http
      .patch<Connector>(`/connectors/${connector.code}`, connector, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        throw e;
      });

    if (res.status !== 200) throw new Error("Error updating connector.");
    return res.data;
  }
}
