import { Container } from "inversify";

import { TYPES } from "./types";
import { ConnectorService } from "@/service/connectorService";
import { DeviceModelService } from "@/service/deviceModelService";
import { DeviceService } from "@/service/deviceService";
import { RequestService } from "@/service/requestService";
import { RoomService } from "@/service/roomService";
import { RouteService } from "@/service/routeService";
import { UserService } from "@/service/userService";

import { api } from "../service/api";
import { BuildingService } from "../service/buildingsService";
import { ElevatorService } from "../service/elevatorService";
import { FloorService } from "../service/floorService";
import { TaskService } from "@/service/taskService";

const container = new Container();

container.bind(TYPES.buildingService).to(BuildingService);
container.bind(TYPES.connectorService).to(ConnectorService);
container.bind(TYPES.elevatorService).to(ElevatorService);
container.bind(TYPES.floorService).to(FloorService);
container.bind(TYPES.deviceModelService).to(DeviceModelService);
container.bind(TYPES.roomService).to(RoomService);
container.bind(TYPES.deviceService).to(DeviceService);
container.bind(TYPES.routeService).to(RouteService);
container.bind(TYPES.userService).to(UserService);
container.bind(TYPES.requestService).to(RequestService);
container.bind(TYPES.taskService).to(TaskService);
container.bind(TYPES.localStorage).toConstantValue(
  import.meta.env.MODE !== "staging"
    ? window.localStorage
    : {
      getItem: () => null,
    }
);
container.bind(TYPES.api).toConstantValue(api);

export { container };
