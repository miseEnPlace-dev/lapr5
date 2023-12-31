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
      email: 'fleet@isep.ipp.pt',
      password: 'fleet',
      phoneNumber: '912345678',
      role: defaultRoles.fleet.name
    });
    await this.loadUser({
      firstName: 'Campus',
      lastName: 'Manager',
      email: 'campus@isep.ipp.pt',
      password: 'campus',
      phoneNumber: '912345678',
      role: defaultRoles.campus.name
    });
    await this.loadUser({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@isep.ipp.pt',
      password: 'admin',
      phoneNumber: '912345678',
      role: defaultRoles.admin.name
    });
    await this.loadUser({
      firstName: 'User',
      lastName: 'Example',
      email: 'user@isep.ipp.pt',
      password: 'user',
      phoneNumber: '912345678',
      nif: '123456789',
      role: defaultRoles.user.name
    });
    await this.loadUser({
      firstName: 'Task',
      lastName: 'Manager',
      email: 'task@isep.ipp.pt',
      password: 'task',
      phoneNumber: '912345678',
      role: defaultRoles.task.name
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

    // Building A
    await this.loadRoom({
      name: 'Auditório Prof Nunes',
      buildingCode: 'a',
      floorCode: 'a1',
      description: 'Auditório Prof Nunes',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 10
      }
    });

    await this.loadRoom({
      name: 'A201',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A201',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 3
      }
    });

    await this.loadRoom({
      name: 'A202',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A202',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'A204',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A204',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 11
      }
    });

    await this.loadRoom({
      name: 'A203',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A203',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'A205',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A205',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 8
      }
    });

    await this.loadRoom({
      name: 'A206',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A206',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 13
      }
    });

    await this.loadRoom({
      name: 'A207',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A207',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 12
      }
    });

    await this.loadRoom({
      name: 'A208',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A208',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 17
      }
    });

    await this.loadRoom({
      name: 'A209',
      buildingCode: 'a',
      floorCode: 'a2',
      description: 'Sala A209',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 2,
        y: 16
      }
    });

    // Building B
    await this.loadRoom({
      name: 'B101',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B101',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 4,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'B102',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B102',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'B103',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B103',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 4,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'B104',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B104',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'B105',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B105',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 4,
        y: 12
      }
    });

    await this.loadRoom({
      name: 'B106',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B106',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 16
      }
    });

    await this.loadRoom({
      name: 'B106b',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B106b',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 19
      }
    });

    await this.loadRoom({
      name: 'B107',
      buildingCode: 'b',
      floorCode: 'b1',
      description: 'Sala B107',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 4,
        y: 19
      }
    });

    await this.loadRoom({
      name: 'B203',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Sala B203',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'B202',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Sala B202',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 12
      }
    });

    await this.loadRoom({
      name: 'B205',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Sala B205',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 18
      }
    });

    await this.loadRoom({
      name: 'B207',
      buildingCode: 'b',
      floorCode: 'b2',
      description: 'Sala B207',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 4,
        y: 20
      }
    });

    await this.loadRoom({
      name: 'B301',
      buildingCode: 'b',
      floorCode: 'b3',
      description: 'Sala B301',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 1,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'B303',
      buildingCode: 'b',
      floorCode: 'b3',
      description: 'Sala B303',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 1,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'B305',
      buildingCode: 'b',
      floorCode: 'b3',
      description: 'Sala B305',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 1,
        y: 12
      }
    });

    await this.loadRoom({
      name: 'B302',
      buildingCode: 'b',
      floorCode: 'b3',
      description: 'Sala B302',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 13
      }
    });

    // Building C
    await this.loadRoom({
      name: 'C101',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C101',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 2,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'C102',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C102',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 2,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'C103',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C103',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'C104',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C104',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'C106',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C106',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'C108',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C108',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 11,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'C105',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C108',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 14,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'C110',
      buildingCode: 'c',
      floorCode: 'c1',
      description: 'Gabinete C110',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 14,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'C201',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C201',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 1,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'C202',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C202',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 2,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'C203',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C203',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'C205',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C205',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'C207',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C207',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 7,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'C206',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C206',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C204',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C204',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 10,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'C209',
      buildingCode: 'c',
      floorCode: 'c2',
      description: 'Gabinete C209',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'C302',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C302',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'C301',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C301',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 3
      }
    });

    await this.loadRoom({
      name: 'C304',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C304',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'C306',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C306',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C308',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C308',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 10,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C303',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C303',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'C305',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C305',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'C310',
      buildingCode: 'c',
      floorCode: 'c3',
      description: 'Gabinete C310',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C402',
      buildingCode: 'c',
      floorCode: 'c4',
      description: 'Gabinete C402',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C401',
      buildingCode: 'c',
      floorCode: 'c4',
      description: 'Gabinete C401',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 7,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'C404',
      buildingCode: 'c',
      floorCode: 'c4',
      description: 'Gabinete C404',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 10,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'C403',
      buildingCode: 'c',
      floorCode: 'c4',
      description: 'Gabinete C403',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 5
      }
    });

    // Building D
    await this.loadRoom({
      name: 'D101',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D101',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 1
      }
    });

    await this.loadRoom({
      name: 'D102',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D102',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 2,
        y: 7
      }
    });

    await this.loadRoom({
      name: 'D103',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D103',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 7,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'D106',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D106',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 9,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'D105',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D105',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 11,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'D104',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D104',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 6,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'D108',
      buildingCode: 'd',
      floorCode: 'd1',
      description: 'Gabinete D108',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'D201',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D201',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 3,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'D203',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D203',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 7,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'D202',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D202',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 7,
        y: 5
      }
    });

    await this.loadRoom({
      name: 'D204',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D204',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 10,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'D205',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D205',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 11,
        y: 2
      }
    });

    await this.loadRoom({
      name: 'D206',
      buildingCode: 'd',
      floorCode: 'd2',
      description: 'Gabinete D206',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 4
      }
    });

    await this.loadRoom({
      name: 'D301',
      buildingCode: 'd',
      floorCode: 'd3',
      description: 'Gabinete D301',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 3
      }
    });

    await this.loadRoom({
      name: 'D302',
      buildingCode: 'd',
      floorCode: 'd3',
      description: 'Gabinete D302',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 5,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'D303',
      buildingCode: 'd',
      floorCode: 'd3',
      description: 'Gabinete D303',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 3
      }
    });

    await this.loadRoom({
      name: 'D304',
      buildingCode: 'd',
      floorCode: 'd3',
      description: 'Gabinete D304',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 8,
        y: 6
      }
    });

    await this.loadRoom({
      name: 'D305',
      buildingCode: 'd',
      floorCode: 'd3',
      description: 'Gabinete D305',
      dimensions: {
        width: 4,
        length: 4
      },
      category: 'OFFICE',
      roomDoor: {
        x: 12,
        y: 5
      }
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
      isAvailable: true,
      initialCoordinates: {
        width: 7,
        depth: 21,
        floorCode: 'b1'
      }
    });

    await this.loadDevice({
      code: 'deliver',
      nickname: 'ISEP Delivery Guy',
      modelCode: 'DLV',
      description: 'ISEP Pick and Delivery Robot',
      serialNumber: 'RBT2',
      isAvailable: true,
      initialCoordinates: {
        width: 7,
        depth: 21,
        floorCode: 'b1'
      }
    });

    await this.loadDevice({
      code: 'master',
      nickname: 'ISEP Master Robot',
      modelCode: 'ALL',
      description: 'ISEP Master All in One Robot',
      serialNumber: 'RBT3',
      isAvailable: true,
      initialCoordinates: {
        width: 8,
        depth: 21,
        floorCode: 'b2'
      }
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
        nif: user.nif,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        state: 'active'
      });

      if (res.isFailure) throw new Error(res.errorValue());

      if (user.role == 'user') this.userService.activateUser(res.getValue().user.id);
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
      roomExists = await this.roomService.getRoomWithName(
        room.buildingCode,
        room.floorCode,
        room.name
      );

    if (roomExists && roomExists.isFailure) {
      const res = await this.roomService.createRoom({
        name: room.name,
        buildingCode: room.buildingCode,
        floorCode: room.floorCode,
        description: room.description,
        dimensions: room.dimensions,
        category: room.category,
        roomDoor: {
          x: room.roomDoor.x + 1,
          y: room.roomDoor.y + 1
        }
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

  private async loadDevice(device: Omit<IDeviceDTO, 'id'>) {
    const deviceExists = await this.deviceService.getDeviceRobotWithCode(device.code);

    if (deviceExists.isFailure) {
      const res = await this.deviceService.createDevice({
        code: device.code,
        nickname: device.nickname,
        modelCode: device.modelCode,
        description: device.description,
        serialNumber: device.serialNumber,
        isAvailable: device.isAvailable,
        initialCoordinates: device.initialCoordinates
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
