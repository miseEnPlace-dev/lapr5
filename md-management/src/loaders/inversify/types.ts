const TYPES = {
  buildingSchema: Symbol.for('BuildingSchema'),
  buildingRepo: Symbol.for('BuildingRepo'),
  buildingService: Symbol.for('BuildingService'),
  buildingController: Symbol.for('BuildingController'),

  floorController: Symbol.for('FloorController'),
  floorService: Symbol.for('FloorService'),
  floorRepo: Symbol.for('FloorRepo'),
  floorSchema: Symbol.for('FloorSchema'),

  roomController: Symbol.for('RoomController'),
  roomService: Symbol.for('RoomService'),
  roomRepo: Symbol.for('RoomRepo'),
  roomSchema: Symbol.for('RoomSchema'),

  userController: Symbol.for('UserController'),
  userService: Symbol.for('UserService'),
  userRepo: Symbol.for('UserRepo'),
  userSchema: Symbol.for('UserSchema'),

  elevatorController: Symbol.for('ElevatorController'),
  elevatorService: Symbol.for('ElevatorService'),

  deviceController: Symbol.for('DeviceController'),
  deviceService: Symbol.for('DeviceService'),
  deviceRepo: Symbol.for('DeviceRepo'),
  deviceSchema: Symbol.for('DeviceSchema'),

  deviceModelController: Symbol.for('DeviceModelController'),
  deviceModelService: Symbol.for('DeviceModelService'),
  deviceModelRepo: Symbol.for('DeviceModelRepo'),
  deviceModelSchema: Symbol.for('DeviceModelSchema'),

  roleController: Symbol.for('RoleController'),
  roleService: Symbol.for('RoleService'),
  roleRepo: Symbol.for('RoleRepo'),
  roleSchema: Symbol.for('RoleSchema'),

  connectorController: Symbol.for('ConnectorController'),
  connectorService: Symbol.for('ConnectorService'),
  connectorRepo: Symbol.for('ConnectorRepo'),
  connectorSchema: Symbol.for('ConnectorSchema'),

  logger: Symbol.for('Logger')
};

export { TYPES };
