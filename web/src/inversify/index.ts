import { Container } from "inversify";

import { TYPES } from "./types";

import { BuildingsService } from "../service/buildingsService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingsService);

export { container };
