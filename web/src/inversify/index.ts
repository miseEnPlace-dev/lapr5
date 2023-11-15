import { Container } from "inversify";

import { TYPES } from "./types";

import api from "../service/api";
import { BuildingService } from "../service/buildingsService";
import { ElevatorService } from "../service/elevatorService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingService);
container.bind(TYPES.elevatorService).to(ElevatorService);

container.bind(TYPES.api).toConstantValue(api);

export { container };
