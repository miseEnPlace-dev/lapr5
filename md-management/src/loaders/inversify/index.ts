import { Container } from 'inversify';

import { TYPES } from './types';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import IConnectorController from '@/controllers/IControllers/IConnectorController';
import IDeviceController from '@/controllers/IControllers/IDeviceController';
import IDeviceModelController from '@/controllers/IControllers/IDeviceModelController';
import IElevatorController from '@/controllers/IControllers/IElevatorController';
import IFloorController from '@/controllers/IControllers/IFloorController';
import IRoleController from '@/controllers/IControllers/IRoleController';
import IRoomController from '@/controllers/IControllers/IRoomController';
import IUserController from '@/controllers/IControllers/IUserController';
import BuildingController from '@/controllers/buildingController';
import ConnectorController from '@/controllers/connectorController';
import DeviceController from '@/controllers/deviceController';
import DeviceModelController from '@/controllers/deviceModelController';
import ElevatorController from '@/controllers/elevatorController';
import FloorController from '@/controllers/floorController';
import RoleController from '@/controllers/roleController';
import RoomController from '@/controllers/roomController';
import UserController from '@/controllers/userController';
import BuildingSchema from '@/persistence/schemas/buildingSchema';
import ConnectorSchema from '@/persistence/schemas/connectorSchema';
import DeviceModelSchema from '@/persistence/schemas/deviceModelSchema';
import DeviceSchema from '@/persistence/schemas/deviceSchema';
import FloorSchema from '@/persistence/schemas/floorSchema';
import RoleSchema from '@/persistence/schemas/roleSchema';
import RoomSchema from '@/persistence/schemas/roomSchema';
import UserSchema from '@/persistence/schemas/userSchema';
import BuildingRepo from '@/repos/buildingRepo';
import ConnectorRepo from '@/repos/connectorRepo';
import DeviceModelRepo from '@/repos/deviceModelRepo';
import DeviceRepo from '@/repos/deviceRepo';
import FloorRepo from '@/repos/floorRepo';
import RoleRepo from '@/repos/roleRepo';
import RoomRepo from '@/repos/roomRepo';
import UserRepo from '@/repos/userRepo';
import IBuildingRepo from '@/services/IRepos/IBuildingRepo';
import IConnectorRepo from '@/services/IRepos/IConnectorRepo';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';
import IDeviceRepo from '@/services/IRepos/IDeviceRepo';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IRoleRepo from '@/services/IRepos/IRoleRepo';
import IRoomRepo from '@/services/IRepos/IRoomRepo';
import IUserRepo from '@/services/IRepos/IUserRepo';
import IBuildingService from '@/services/IServices/IBuildingService';
import IConnectorService from '@/services/IServices/IConnectorService';
import IDeviceModelService from '@/services/IServices/IDeviceModelService';
import IDeviceService from '@/services/IServices/IDeviceService';
import IElevatorService from '@/services/IServices/IElevatorService';
import IFloorService from '@/services/IServices/IFloorService';
import IRoleService from '@/services/IServices/IRoleService';
import IRoomService from '@/services/IServices/IRoomService';
import IUserService from '@/services/IServices/IUserService';
import BuildingService from '@/services/buildingService';
import ConnectorService from '@/services/connectorService';
import DeviceModelService from '@/services/deviceModelService';
import DeviceService from '@/services/deviceService';
import ElevatorService from '@/services/elevatorService';
import FloorService from '@/services/floorService';
import RoleService from '@/services/roleService';
import RoomService from '@/services/roomService';
import UserService from '@/services/userService';
import { Logger } from 'winston';
import LoggerInstance from '../logger';

const container = new Container();

container.bind<IBuildingController>(TYPES.buildingController).to(BuildingController);
container.bind<IBuildingService>(TYPES.buildingService).to(BuildingService);
container.bind<IBuildingRepo>(TYPES.buildingRepo).to(BuildingRepo);
container.bind(TYPES.buildingSchema).to(BuildingSchema);

container.bind<IFloorController>(TYPES.floorController).to(FloorController);
container.bind<IFloorService>(TYPES.floorService).to(FloorService);
container.bind<IFloorRepo>(TYPES.floorRepo).to(FloorRepo);
container.bind(TYPES.floorSchema).to(FloorSchema);

container.bind<IRoomController>(TYPES.roomController).to(RoomController);
container.bind<IRoomService>(TYPES.roomService).to(RoomService);
container.bind<IRoomRepo>(TYPES.roomRepo).to(RoomRepo);
container.bind(TYPES.roomSchema).to(RoomSchema);

container.bind<IUserController>(TYPES.userController).to(UserController);
container.bind<IUserService>(TYPES.userService).to(UserService);
container.bind<IUserRepo>(TYPES.userRepo).to(UserRepo);
container.bind(TYPES.userSchema).to(UserSchema);

container.bind<IElevatorController>(TYPES.elevatorController).to(ElevatorController);
container.bind<IElevatorService>(TYPES.elevatorService).to(ElevatorService);

container.bind<IDeviceController>(TYPES.deviceController).to(DeviceController);
container.bind<IDeviceService>(TYPES.deviceService).to(DeviceService);
container.bind<IDeviceRepo>(TYPES.deviceRepo).to(DeviceRepo);
container.bind(TYPES.deviceSchema).to(DeviceSchema);

container.bind<IDeviceModelController>(TYPES.deviceModelController).to(DeviceModelController);
container.bind<IDeviceModelService>(TYPES.deviceModelService).to(DeviceModelService);
container.bind<IDeviceModelRepo>(TYPES.deviceModelRepo).to(DeviceModelRepo);
container.bind(TYPES.deviceModelSchema).to(DeviceModelSchema);

container.bind<IRoleController>(TYPES.roleController).to(RoleController);
container.bind<IRoleService>(TYPES.roleService).to(RoleService);
container.bind<IRoleRepo>(TYPES.roleRepo).to(RoleRepo);
container.bind(TYPES.roleSchema).to(RoleSchema);

container.bind<IConnectorController>(TYPES.connectorController).to(ConnectorController);
container.bind<IConnectorService>(TYPES.connectorService).to(ConnectorService);
container.bind<IConnectorRepo>(TYPES.connectorRepo).to(ConnectorRepo);
container.bind(TYPES.connectorSchema).to(ConnectorSchema);

container.bind<Logger>(TYPES.logger).toConstantValue(LoggerInstance);

export { container };
