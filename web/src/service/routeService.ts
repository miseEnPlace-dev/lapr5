import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";

import { HttpService } from "./IService/HttpService";
import {
  GetRouteProps,
  IRouteService,
  RouteCell,
} from "./IService/IRouteService";

@injectable()
export class RouteService implements IRouteService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getRoutes(props: GetRouteProps): Promise<RouteCell[]> {
    const res = await this.http.post("/routes", props);

    return res.data as RouteCell[];
  }
}
