import { defaultRoles } from '@/domain/role/defaultRoles';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IRoomDTO } from '@/dto/IRoomDTO';
import { IUserDTO } from '@/dto/IUserDTO';
import IBuildingService from '@/services/IServices/IBuildingService';
import IConnectorService from '@/services/IServices/IConnectorService';
import IDeviceModelService from '@/services/IServices/IDeviceModelService';
import IDeviceService from '@/services/IServices/IDeviceService';
import IElevatorService from '@/services/IServices/IElevatorService';
import IFloorService from '@/services/IServices/IFloorService';
import IRoleService from '@/services/IServices/IRoleService';
import IRoomService from '@/services/IServices/IRoomService';
import IUserService from '@/services/IServices/IUserService';
import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';

import bAf1 from '../../../web/public/mazes/building-a-floor-1.json';
import bAf2 from '../../../web/public/mazes/building-a-floor-2.json';
import bBf1 from '../../../web/public/mazes/building-b-floor-1.json';
import bBf2 from '../../../web/public/mazes/building-b-floor-2.json';
import bBf3 from '../../../web/public/mazes/building-b-floor-3.json';
import bCf1 from '../../../web/public/mazes/building-c-floor-1.json';
import bCf2 from '../../../web/public/mazes/building-c-floor-2.json';
import bCf3 from '../../../web/public/mazes/building-c-floor-3.json';
import bCf4 from '../../../web/public/mazes/building-c-floor-4.json';
import bDf1 from '../../../web/public/mazes/building-d-floor-1.json';
import bDf2 from '../../../web/public/mazes/building-d-floor-2.json';
import bDf3 from '../../../web/public/mazes/building-d-floor-3.json';

@injectable()
export default class Bootstrapper {
  constructor(
    @inject(TYPES.roleService) private roleService: IRoleService,
    @inject(TYPES.userService) private userService: IUserService,
    @inject(TYPES.buildingService) private buildingService: IBuildingService,
    @inject(TYPES.floorService) private floorService: IFloorService,
    @inject(TYPES.connectorService) private connectorService: IConnectorService,
    @inject(TYPES.roomService) private roomService: IRoomService,
    @inject(TYPES.deviceModelService) private deviceModelService: IDeviceModelService,
    @inject(TYPES.deviceService) private deviceService: IDeviceService,
    @inject(TYPES.elevatorService) private elevatorService: IElevatorService
  ) {}

  public async bootstrap() {
    for (const role in defaultRoles) {
      await this.loadRole({
        name: defaultRoles[role].name,
        title: defaultRoles[role].title,
        description: defaultRoles[role].description
      });
    }

    await this.loadUser({
      firstName: 'Fleet',
      lastName: 'Manager',
      email: 'fleet@fleet.com',
      password: 'fleet',
      phoneNumber: '912345678',
      role: defaultRoles.fleet.name
    });
    await this.loadUser({
      firstName: 'Campus',
      lastName: 'Manager',
      email: 'campus@campus.com',
      password: 'campus',
      phoneNumber: '912345678',
      role: defaultRoles.campus.name
    });
    await this.loadUser({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
      phoneNumber: '912345678',
      role: defaultRoles.admin.name
    });

    await this.loadBuilding({
      code: 'a',
      name: 'Building A',
      description: 'Building A',
      maxDimensions: {
        width: 22,
        length: 10
      }
    });
    await this.loadBuilding({
      code: 'b',
      name: 'Building B',
      description: 'Building B',
      maxDimensions: {
        width: 22,
        length: 10
      }
    });
    await this.loadBuilding({
      code: 'c',
      name: 'Building C',
      description: 'Building C',
      maxDimensions: {
        width: 9,
        length: 15
      }
    });
    await this.loadBuilding({
      code: 'd',
      name: 'Building D',
      description: 'Building D',
      maxDimensions: {
        width: 9,
        length: 14
      }
    });

    await this.loadFloor({
      code: 'c1',
      buildingCode: 'c',
      description: 'Floor C1',
      dimensions: {
        width: 9,
        length: 15
      },
      map: bCf1
    });

    await this.loadFloor({
      code: 'd1',
      buildingCode: 'd',
      description: 'Floor D1',
      dimensions: {
        width: 9,
        length: 14
      },
      map: bDf1
    });

    await this.loadFloor({
      code: 'a1',
      buildingCode: 'a',
      description: 'Floor A1',
      dimensions: {
        width: 22,
        length: 10
      },
      map: bAf1
    });

    await this.loadFloor({
      code: 'b1',
      buildingCode: 'b',
      description: 'Floor B1',
      dimensions: {
        width: 22,
        length: 10
      },
      map: bBf1
    });

    await this.loadFloor({
      code: 'c2',
      buildingCode: 'c',
      description: 'Floor C2',
      dimensions: {
        width: 9,
        length: 15
      },
      map: bCf2
    });

    await this.loadFloor({
      code: 'd2',
      buildingCode: 'd',
      description: 'Floor D2',
      dimensions: {
        width: 9,
        length: 14
      },
      map: bDf2
    });

    await this.loadFloor({
      code: 'a2',
      buildingCode: 'a',
      description: 'Floor A2',
      dimensions: {
        width: 22,
        length: 10
      },
      map: bAf2
    });

    await this.loadFloor({
      code: 'b2',
      buildingCode: 'b',
      description: 'Floor B2',
      dimensions: {
        width: 22,
        length: 10
      },
      map: bBf2
    });

    await this.loadFloor({
      code: 'c3',
      buildingCode: 'c',
      description: 'Floor C3',
      dimensions: {
        width: 9,
        length: 15
      },
      map: bCf3
    });

    await this.loadFloor({
      code: 'd3',
      buildingCode: 'd',
      description: 'Floor D3',
      dimensions: {
        width: 9,
        length: 14
      },
      map: bDf3
    });

    await this.loadFloor({
      code: 'b3',
      buildingCode: 'b',
      description: 'Floor B3',
      dimensions: {
        width: 22,
        length: 10
      },
      map: bBf3
    });

    await this.loadFloor({
      code: 'c4',
      buildingCode: 'c',
      description: 'Floor C4',
      dimensions: {
        width: 9,
        length: 15
      },
      map: bCf4
    });

    await this.loadConnector({
      code: 'c2d2',
      floor1Code: 'c2',
      floor1BuildingCode: 'c',
      floor2Code: 'd2',
      floor2BuildingCode: 'd'
    });

    await this.loadConnector({
      code: 'a2b2',
      floor1Code: 'a2',
      floor1BuildingCode: 'a',
      floor2Code: 'b2',
      floor2BuildingCode: 'b'
    });

    await this.loadConnector({
      code: 'b2c3',
      floor1Code: 'b2',
      floor1BuildingCode: 'b',
      floor2Code: 'c3',
      floor2BuildingCode: 'c'
    });

    await this.loadConnector({
      code: 'c3d3',
      floor1Code: 'c3',
      floor1BuildingCode: 'c',
      floor2Code: 'd3',
      floor2BuildingCode: 'd'
    });

    await this.loadConnector({
      code: 'b2d3',
      floor1Code: 'b2',
      floor1BuildingCode: 'b',
      floor2Code: 'd3',
      floor2BuildingCode: 'd'
    });

    await this.loadConnector({
      code: 'b3c4',
      floor1Code: 'b3',
      floor1BuildingCode: 'b',
      floor2Code: 'c4',
      floor2BuildingCode: 'c'
    });

    await this.loadRoom({
      name: 'B201',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Auditório B201',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B203',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Sala de Aula B203',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B306',
      buildingCode: 'b',
      floorCode: 'b3',
      description: 'Sala de Aula B306',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B216',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Gabinete B216',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE'
    });

    await this.loadDeviceModel({
      code: 'SRV',
      name: 'Surveillance Master',
      type: 'robot',
      brand: 'DJI',
      capabilities: ['surveillance']
    });

    await this.loadDeviceModel({
      code: 'DLV',
      name: 'Delivery Expert',
      type: 'robot',
      brand: 'DJI',
      capabilities: ['pick_delivery']
    });

    await this.loadDeviceModel({
      code: 'ALL',
      name: 'All in One Robot',
      type: 'robot',
      brand: 'DJI',
      capabilities: ['pick_delivery', 'surveillance']
    });

    await this.loadDevice({
      code: 'guard',
      nickname: 'ISEP Guard',
      modelCode: 'SRV',
      description: 'ISEP Security Guard',
      serialNumber: 'RBT1',
      isAvailable: true
    });

    await this.loadDevice({
      code: 'deliver',
      nickname: 'ISEP Delivery Guy',
      modelCode: 'DLV',
      description: 'ISEP Pick and Delivery Robot',
      serialNumber: 'RBT2',
      isAvailable: true
    });

    await this.loadDevice({
      code: 'master',
      nickname: 'ISEP Master Robot',
      modelCode: 'ALL',
      description: 'ISEP Master All in One Robot',
      serialNumber: 'RBT3',
      isAvailable: true
    });

    await this.loadElevator({
      code: 1,
      floorCodes: ['a1', 'a2'],
      buildingCode: 'a',
      brand: 'Schindler',
      model: 'S3000',
      serialNumber: 'E1',
      description: 'Elevator of Building A'
    });

    await this.loadElevator({
      code: 2,
      floorCodes: ['b1', 'b2', 'b3'],
      buildingCode: 'b',
      brand: 'Schindler',
      model: 'S3000',
      serialNumber: 'E1',
      description: 'Elevator of Building B'
    });

    await this.loadElevator({
      code: 3,
      floorCodes: ['c1', 'c2', 'c3', 'c4'],
      buildingCode: 'c',
      brand: 'Schindler',
      model: 'S3000',
      serialNumber: 'E1',
      description: 'Elevator of Building C'
    });

    await this.loadElevator({
      code: 4,
      floorCodes: ['d1', 'd2', 'd3'],
      buildingCode: 'd',
      brand: 'Schindler',
      model: 'S3000',
      serialNumber: 'E1',
      description: 'Elevator of Building D'
    });
  }

  private async loadRole({
    name,
    title,
    description
  }: {
    title: string;
    name: string;
    description?: string;
  }) {
    const roleExists = await this.roleService.exists(name);
    if (!roleExists) await this.roleService.createRole({ name, title, description });
  }

  private async loadUser(user: Omit<IUserDTO, 'state' | 'id'>) {
    const userExists = await this.userService.findByEmail(user.email);

    if (userExists.isFailure) {
      const res = await this.userService.signUp({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        state: 'active'
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadBuilding(building: IBuildingDTO) {
    const buildingExists = await this.buildingService.getBuildingWithCode(building.code);

    if (buildingExists.isFailure) {
      const res = await this.buildingService.createBuilding({
        code: building.code,
        name: building.name,
        description: building.description,
        maxDimensions: building.maxDimensions,
        elevatorFloors: building.elevatorFloors
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadFloor(floor: IFloorDTO) {
    const floorExists = await this.floorService.getFloorWithCode(floor.code);

    if (floorExists.isFailure) {
      const res = await this.floorService.createFloor({
        code: floor.code,
        buildingCode: floor.buildingCode,
        description: floor.description,
        dimensions: floor.dimensions,
        map: floor.map
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadConnector(connector: IConnectorDTO) {
    const connectorExists = await this.connectorService.getConnectorByCode(connector.code);

    if (connectorExists.isFailure) {
      const res = await this.connectorService.createConnector({
        code: connector.code,
        floor1Code: connector.floor1Code,
        floor1BuildingCode: connector.floor1BuildingCode,
        floor2Code: connector.floor2Code,
        floor2BuildingCode: connector.floor2BuildingCode
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadRoom(room: IRoomDTO) {
    let roomExists;
    if (room.buildingCode)
      roomExists = await this.roomService.getRoom(room.buildingCode, room.floorCode, room.name);

    if (roomExists && roomExists.isFailure) {
      const res = await this.roomService.createRoom({
        name: room.name,
        buildingCode: room.buildingCode,
        floorCode: room.floorCode,
        description: room.description,
        dimensions: room.dimensions,
        category: room.category
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadDeviceModel(deviceModel: IDeviceModelDTO) {
    const deviceModelExists = await this.deviceModelService.getDeviceModelWithCode(
      deviceModel.code
    );

    if (deviceModelExists.isFailure) {
      const res = await this.deviceModelService.createDeviceModel({
        code: deviceModel.code,
        name: deviceModel.name,
        type: deviceModel.type,
        brand: deviceModel.brand,
        capabilities: deviceModel.capabilities
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadDevice(device: IDeviceDTO) {
    const deviceExists = await this.deviceService.getDeviceRobotWithCode(device.code);

    if (deviceExists.isFailure) {
      const res = await this.deviceService.createDevice({
        code: device.code,
        nickname: device.nickname,
        modelCode: device.modelCode,
        description: device.description,
        serialNumber: device.serialNumber,
        isAvailable: device.isAvailable
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }

  private async loadElevator(elevator: IElevatorDTO) {
    const elevatorExists = await this.elevatorService.getElevatorForBuilding(elevator.buildingCode);

    if (elevatorExists.isFailure) {
      const res = await this.elevatorService.createElevator({
        code: elevator.code,
        floorCodes: elevator.floorCodes,
        buildingCode: elevator.buildingCode,
        brand: elevator.brand,
        model: elevator.model,
        serialNumber: elevator.serialNumber,
        description: elevator.description
      });

      if (res.isFailure) throw new Error(res.errorValue());
    }
  }
}
