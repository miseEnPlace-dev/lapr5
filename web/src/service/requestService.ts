import "reflect-metadata";

import { inject, injectable } from "inversify";

import { TYPES } from "../inversify/types";

import { HttpService } from "./IService/HttpService";
import { IRequestService } from "./IService/IRequestService";
import { Request } from "@/model/Request";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { mdTasksApi } from "./api";

@injectable()
export class RequestService implements IRequestService {
  constructor(
    @inject(TYPES.mdTasksApi) private http: HttpService
  ) { }

  async getAllRequests(): Promise<Request[]> {
    const response = await this.http.get<Request[]>("/Requests", {});

    const data = response.data;
    return data;
  }

  async createSurveillanceRequest(request: Request): Promise<Request> {
    console.log(request);

    const response = await this.http.post<Request>("/Requests/Surveillance", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return data;
  }
}
