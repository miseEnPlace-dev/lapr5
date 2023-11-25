import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";

import { HttpService } from "./IService/HttpService";
import { IRouteService } from "./IService/IRouteService";

@injectable()
export class RouteService implements IRouteService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getRoutes(from: string, to: string, method: string): Promise<string[]> {
    const res = await this.http.get(
      `/routes?from=${from}&to=${to}&method=${method}`
    );

    return res.data as string[];
  }
}
