import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { HttpService } from "./IService/HttpService";
import { IRequestService } from "./IService/IRequestService";
import { Request } from "@/model/Request";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { mdTasksApi } from "./api";
import { capitalize } from "lodash";

@injectable()
export class RequestService implements IRequestService {
  constructor(
    @inject(TYPES.mdTasksApi) private http: HttpService
  ) { }

  async getAllRequests(
    filter?: "state" | "userId",
    value?: string,
  ): Promise<Request[]> {
    console.log(filter, value);
    console.log("Request url: " + "/Requests?" + filter + "=" + value)
    const response = await this.http.get<Request[]>("/Requests?" + filter + "=" + capitalize(value), {});

    const data = response.data;
    return data;
  }

  async createSurveillanceRequest(request: Request): Promise<Request> {
    const response = await this.http.post<Request>("/Requests/Surveillance", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return data;
  }

  async createPickAndDeliveryRequest(request: Request): Promise<Request> {
    const response = await this.http.post<Request>("/Requests/Pick-Delivery", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return data;
  }
}
