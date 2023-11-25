import { defaultRoles } from '@/domain/role/defaultRoles';
import { IUserDTO } from '@/dto/IUserDTO';
import IRoleService from '@/services/IServices/IRoleService';
import IUserService from '@/services/IServices/IUserService';
import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';
import IBuildingService from '@/services/IServices/IBuildingService';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { IFloorDTO } from '@/dto/IFloorDTO';
import IFloorService from '@/services/IServices/IFloorService';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import IConnectorService from '@/services/IServices/IConnectorService';

@injectable()
export default class Bootstrapper {
  constructor(
    @inject(TYPES.roleService) private roleService: IRoleService,
    @inject(TYPES.userService) private userService: IUserService,
    @inject(TYPES.buildingService) private buildingService: IBuildingService,
    @inject(TYPES.floorService) private floorService: IFloorService,
    @inject(TYPES.connectorService) private connectorService: IConnectorService
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

    await this.loadBuilding({
      code: 'A',
      name: 'Building A',
      description: 'Building A',
      maxDimensions: {
        width: 22,
        length: 10
      }
    });
    await this.loadBuilding({
      code: 'B',
      name: 'Building B',
      description: 'Building B',
      maxDimensions: {
        width: 22,
        length: 10
      }
    });
    await this.loadBuilding({
      code: 'C',
      name: 'Building C',
      description: 'Building C',
      maxDimensions: {
        width: 9,
        length: 15
      }
    });
    await this.loadBuilding({
      code: 'D',
      name: 'Building D',
      description: 'Building D',
      maxDimensions: {
        width: 9,
        length: 14
      }
    });

    await this.loadFloor({
      code: 'C1',
      buildingCode: 'C',
      description: 'Floor C1',
      dimensions: {
        width: 9,
        length: 15
      },
      map: {
        maze: {
          size: { width: 9, depth: 15 },
          map: [
            [3, 2, 2, 2, 3, 2, 3, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 11, 0, 1, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 3, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 11, 0, 11, 0, 0, 1],
            [3, 2, 2, 2, 0, 0, 3, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 11, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 3, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 11, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 3, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 11, 0, 11, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: []
        }
      }
    });

    await this.loadFloor({
      code: 'D1',
      buildingCode: 'D',
      description: 'Floor D1',
      dimensions: {
        width: 9,
        length: 14
      },
      map: {
        maze: {
          size: { width: 9, depth: 14 },
          map: [
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 1, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 3, 2, 2, 2, 1],
            [3, 2, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: []
        }
      }
    });

    await this.loadFloor({
      code: 'A1',
      buildingCode: 'A',
      description: 'Floor A1',
      dimensions: {
        width: 22,
        length: 10
      },
      map: {
        maze: {
          size: { width: 22, depth: 10 },
          map: [
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: []
        }
      }
    });

    await this.loadFloor({
      code: 'B1',
      buildingCode: 'B',
      description: 'Floor B1',
      dimensions: {
        width: 22,
        length: 10
      },
      map: {
        maze: {
          size: { width: 22, depth: 10 },
          map: [
            [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 12, 2, 2, 12, 2, 2, 2, 2, 2, 2, 12, 2, 2, 2, 2, 2, 2, 12, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 12, 2, 1, 12, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 12, 2, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 1],
            [1, 0, 0, 0, 1, 0, 11, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: []
        }
      }
    });

    await this.loadFloor({
      code: 'C2',
      buildingCode: 'C',
      description: 'Floor C2',
      dimensions: {
        width: 9,
        length: 15
      },
      map: {
        maze: {
          size: { width: 9, depth: 15 },
          map: [
            [3, 2, 3, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 11, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 12, 2, 2, 2, 1],
            [1, 0, 11, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 3, 2, 2, 2, 2, 1, 0, 1],
            [3, 2, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 3, 2, 2, 2, 12, 0, 0, 1],
            [1, 0, 11, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 0, 0, 0, 0, 3, 2, 12, 1],
            [1, 4, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 3, 2, 12, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [3, 2, 12, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 11, y: 2 }]
        }
      }
    });

    await this.loadFloor({
      code: 'D2',
      buildingCode: 'D',
      description: 'Floor D2',
      dimensions: {
        width: 9,
        length: 14
      },
      map: {
        maze: {
          size: { width: 9, depth: 14 },
          map: [
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 2, 3, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 3, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 11, y: 2 }]
        }
      }
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

  private async loadUser(user: IUserDTO) {
    const userExists = await this.userService.findByEmail(user.email);

    if (userExists.isFailure) {
      const res = await this.userService.signUp({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role
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
}
