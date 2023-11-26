import { inject, injectable } from "inversify";

import { TYPES } from "@/inversify/types";

import { HttpService } from "./IService/HttpService";
import { GetRouteProps, IRouteService } from "./IService/IRouteService";

@injectable()
export class RouteService implements IRouteService {
  constructor(@inject(TYPES.api) private http: HttpService) {}

  async getRoutes(props: GetRouteProps): Promise<
    {
      x: number;
      y: number;
      floor: string;
    }[]
  > {
    console.log({ props });
    const res = await this.http.post("/routes", props);

    return res.data as {
      x: number;
      y: number;
      floor: string;
    }[];
  }
}
