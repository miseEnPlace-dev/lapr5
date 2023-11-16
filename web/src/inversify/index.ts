import { Container } from "inversify";

import { TYPES } from "./types";
import { ConnectorService } from "@/service/connectorService";

import api from "../service/api";
import { BuildingService } from "../service/buildingsService";
import { ElevatorService } from "../service/elevatorService";
import { FloorService } from "../service/floorService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingService);
container.bind(TYPES.connectorService).to(ConnectorService);
container.bind(TYPES.elevatorService).to(ElevatorService);
container.bind(TYPES.floorService).to(FloorService);

container.bind(TYPES.api).toConstantValue(api);

export { container };
