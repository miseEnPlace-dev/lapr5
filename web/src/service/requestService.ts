import "reflect-metadata";

import { inject, injectable } from "inversify";
import { capitalize } from "lodash";

import { TYPES } from "../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";

import { mdTasksApi } from "./api";
import { HttpService } from "./IService/HttpService";
import { IRequestService } from "./IService/IRequestService";

@injectable()
export class RequestService implements IRequestService {
  constructor(@inject(TYPES.mdTasksApi) private http: HttpService) {}

  async getAllRequests(
    filter?: "state" | "userId",
    value?: string
  ): Promise<Request[]> {
    console.log(filter, value);
    console.log("Request url: " + "/Requests?" + filter + "=" + value);
    const response = await this.http.get<Request[]>(
      "/Requests?" + filter + "=" + capitalize(value),
      {}
    );

    const data = response.data;
    return data;
  }

  async createSurveillanceRequest(
    request: RequestSurveillance
  ): Promise<RequestSurveillance> {
    const response = await this.http.post<RequestSurveillance>(
      "/Requests/Surveillance",
      request,
      {
        headers: {
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
    const response = await this.http.post<RequestPickAndDelivery>(
      "/Requests/Pick-Delivery",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    return data;
  }

  async acceptRequest(id: string): Promise<void> {
    await this.http.patch("/Requests/" + id + "/accept", {});
  }

  async rejectRequest(id: string): Promise<void> {
    await this.http.patch("/Requests/" + id + "/reject", {});
  }
}
