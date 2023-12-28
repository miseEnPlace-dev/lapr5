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
    value?: string,
    page?: number,
    limit?: number
  ): Promise<IPaginationDTO<Request>> {
    const params = {} as { [key: string]: string };
    if (filter && value) {
      params[filter] = capitalize(value);
    }
    if (page && limit) {
      params["limit"] = limit.toString();
      params["page"] = page.toString();
    }

    const response = await this.http.get<IPaginationDTO<Request>>("/Requests", {
      params,
    });
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
}
