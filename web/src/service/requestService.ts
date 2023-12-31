import "reflect-metadata";

import { inject, injectable } from "inversify";
import { capitalize } from "lodash";

import { TYPES } from "../inversify/types";
import { localStorageConfig } from "@/config/localStorageConfig";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";
import { Sequence } from "@/model/Sequence";

import { HttpService } from "./IService/HttpService";
import { IRequestService } from "./IService/IRequestService";

@injectable()
export class RequestService implements IRequestService {
  constructor(
    @inject(TYPES.api) private http: HttpService,
    @inject(TYPES.localStorage) private localStorage: Storage
  ) {}

  async getAllRequests(
    filter?: "state" | "userId",
    value?: string,
    page?: number,
    limit?: number
  ): Promise<IPaginationDTO<Request>> {
    const params = {} as { [key: string]: string };
    if (filter && value) {
      if (filter === "userId") {
        params["user"] = value.toString();
      } else {
        params["filter"] = filter.toString();
        params["value"] = capitalize(value.toString());
      }
    }
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }

    const token = this.localStorage.getItem(localStorageConfig.token);
    const response = await this.http.get<IPaginationDTO<Request>>(
      "/task-requests",
      {
        params,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("params");

    const data = response.data;
    return data;
  }

  async getMyRequests(
    page?: number,
    limit?: number
  ): Promise<IPaginationDTO<Request>> {
    const params = {} as { [key: string]: string };
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }
    params["user"] = "me";

    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<IPaginationDTO<Request>>(
      "/task-requests",
      {
        params,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    return data;
  }

  async getRequestsByType(
    capability: string,
    page?: number,
    limit?: number
  ): Promise<IPaginationDTO<Request>> {
    const params = {} as { [key: string]: string };
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }

    const token = this.localStorage.getItem(localStorageConfig.token);

    const type =
      capability === "surveillance" ? "surveillance" : "pick-delivery";
    const response = await this.http.get<IPaginationDTO<Request>>(
      "/task-requests/" + type,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    return data;
  }

  async getAcceptedRequests(): Promise<IPaginationDTO<Request>> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.get<IPaginationDTO<Request>>(
      "/task-requests?filter=state&value=accepted",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    return data;
  }

  async createSurveillanceRequest(
    request: RequestSurveillance
  ): Promise<RequestSurveillance> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.post<RequestSurveillance>(
      "/task-requests/Surveillance",
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    return data;
  }

  async createPickAndDeliveryRequest(
    request: RequestPickAndDelivery
  ): Promise<RequestPickAndDelivery> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const response = await this.http.post<RequestPickAndDelivery>(
      "/task-requests/Pick-Delivery",
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    return data;
  }

  async acceptRequest(id: string, deviceCode: string): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    console.log("accepting request");
    console.log(id);
    await this.http.patch(
      "/task-requests/" + id + "/accept",
      {
        deviceId: deviceCode,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async rejectRequest(id: string): Promise<void> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    await this.http.patch(
      "/task-requests/" + id + "/reject",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async getSequence(): Promise<Sequence> {
    const token = this.localStorage.getItem(localStorageConfig.token);

    const res = await this.http.get<Sequence>("/task-requests/sequence", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
}
