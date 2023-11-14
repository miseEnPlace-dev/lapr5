import { Container } from "inversify";

import { TYPES } from "./types";

import { BuildingService } from "../service/buildingsService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingService);

export { container };
