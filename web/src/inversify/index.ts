import { Container } from "inversify";

import { TYPES } from "./types";
import { DeviceModelService } from "@/service/deviceModelService";

import api from "../service/api";
import { BuildingService } from "../service/buildingsService";
import { ElevatorService } from "../service/elevatorService";
import { FloorService } from "../service/floorService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingService);
container.bind(TYPES.elevatorService).to(ElevatorService);
container.bind(TYPES.floorService).to(FloorService);
container.bind(TYPES.deviceModelService).to(DeviceModelService);

container.bind(TYPES.api).toConstantValue(api);

export { container };
