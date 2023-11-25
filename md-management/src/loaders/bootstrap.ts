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
import { IRoomDTO } from '@/dto/IRoomDTO';
import IRoomService from '@/services/IServices/IRoomService';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import IDeviceModelService from '@/services/IServices/IDeviceModelService';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import IDeviceService from '@/services/IServices/IDeviceService';

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
    @inject(TYPES.deviceService) private deviceService: IDeviceService
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
          exits: [],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
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
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 1, 0, 0, 0, 3, 2, 12, 2, 1],
            [1, 11, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 11, 0, 0, 0, 1],
            [1, 0, 11, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 3, 2, 2, 2, 1],
            [3, 2, 1, 0, 0, 11, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 11, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 11, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
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
          exits: [],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
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
          exits: [],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
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
          exits: [{ x: 11, y: 2, floorCode: 'D2' }],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
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
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 11, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 11, 0, 0, 11, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 2, 3, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 11, 0, 0, 1],
            [1, 0, 11, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 3, 2, 12, 2, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 2, y: 10, floorCode: 'C2' }],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'A2',
      buildingCode: 'A',
      description: 'Floor A2',
      dimensions: {
        width: 22,
        length: 10
      },
      map: {
        maze: {
          size: { width: 22, depth: 10 },
          map: [
            [3, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 1],
            [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 5, 1],
            [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 2, 2, 0, 0, 1],
            [1, 0, 0, 3, 2, 2, 12, 2, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 2, 2, 2, 0, 3, 2, 2, 0, 3, 0, 2, 2, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 6, y: 23, floorCode: 'B2' }],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'B2',
      buildingCode: 'B',
      description: 'Floor B2',
      dimensions: {
        width: 22,
        length: 10
      },
      map: {
        maze: {
          size: { width: 22, depth: 10 },
          map: [
            [3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 2, 12, 2, 1],
            [1, 0, 1, 0, 0, 0, 11, 0, 1, 0, 0, 0, 11, 0, 1, 0, 0, 0, 11, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 5, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [
            { x: 6, y: 2, floorCode: 'A2' },
            { x: 9, y: 23, floorCode: 'C3' },
            { x: 11, y: 22, floorCode: 'D3' }
          ],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'C3',
      buildingCode: 'C',
      description: 'Floor C3',
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
            [1, 0, 3, 2, 2, 12, 2, 0, 0, 1],
            [1, 0, 11, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 0, 0, 0, 0, 3, 12, 2, 1],
            [1, 4, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 3, 12, 2, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [3, 12, 2, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [
            { x: 7, y: 2, floorCode: 'B2' },
            { x: 11, y: 2, floorCode: 'D3' }
          ],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'D3',
      buildingCode: 'D',
      description: 'Floor D3',
      dimensions: {
        width: 9,
        length: 14
      },
      map: {
        maze: {
          size: { width: 9, depth: 14 },
          map: [
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 1, 0, 0, 3, 2, 2, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 11, 0, 0, 11, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [3, 2, 2, 1, 0, 0, 3, 2, 2, 1],
            [1, 0, 0, 11, 0, 0, 11, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [
            { x: 0, y: 8, floorCode: 'B2' },
            { x: 1, y: 10, floorCode: 'C3' }
          ],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'B3',
      buildingCode: 'B',
      description: 'Floor B3',
      dimensions: {
        width: 22,
        length: 10
      },
      map: {
        maze: {
          size: { width: 22, depth: 10 },
          map: [
            [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 11, 0, 11, 0, 0, 0, 1, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
            [1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 3, 12, 2, 2, 2, 2, 1, 0, 2, 2, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 9, y: 23, floorCode: 'C4' }],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadFloor({
      code: 'C4',
      buildingCode: 'C',
      description: 'Floor C4',
      dimensions: {
        width: 9,
        length: 15
      },
      map: {
        maze: {
          size: { width: 9, depth: 15 },
          map: [
            [3, 2, 2, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 2, 12, 2, 1],
            [1, 0, 0, 0, 0, 11, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 0, 3, 2, 2, 1],
            [1, 4, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 12, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 12, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ],
          exits: [{ x: 9, y: 2, floorCode: 'B3' }],
          elevator: { x: 1, y: 1 },
          exitLocation: { x: 1, y: 1 }
        },
        player: {
          initialPosition: [1, 1],
          initialDirection: 1
        },
        door: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        elevator: {
          url: '',
          scale: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        wall: {
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        },
        ground: {
          size: {
            width: 1,
            height: 1,
            depth: 1
          },
          segments: {
            width: 1,
            height: 1,
            depth: 1
          },
          primaryColor: '',
          maps: {
            color: {
              url: ''
            },
            ao: {
              url: '',
              intensity: 1
            },
            displacement: {
              url: '',
              scale: 1,
              bias: 1
            },
            normal: {
              url: '',
              type: 1,
              scale: {
                x: 1,
                y: 1
              }
            },
            bump: {
              url: '',
              scale: 1
            },
            roughness: {
              url: '',
              rough: 1
            }
          },
          wrapS: 1,
          wrapT: 1,
          repeat: {
            u: 1,
            v: 1
          },
          magFilter: 1,
          minFilter: 1,
          secondaryColor: ''
        }
      }
    });

    await this.loadConnector({
      code: 'C2D2',
      floor1Code: 'C2',
      floor1BuildingCode: 'C',
      floor2Code: 'D2',
      floor2BuildingCode: 'D'
    });

    await this.loadConnector({
      code: 'A2B2',
      floor1Code: 'A2',
      floor1BuildingCode: 'A',
      floor2Code: 'B2',
      floor2BuildingCode: 'B'
    });

    await this.loadConnector({
      code: 'B2C3',
      floor1Code: 'B2',
      floor1BuildingCode: 'B',
      floor2Code: 'C3',
      floor2BuildingCode: 'C'
    });

    await this.loadConnector({
      code: 'C3D3',
      floor1Code: 'C3',
      floor1BuildingCode: 'C',
      floor2Code: 'D3',
      floor2BuildingCode: 'D'
    });

    await this.loadConnector({
      code: 'B2D3',
      floor1Code: 'B2',
      floor1BuildingCode: 'B',
      floor2Code: 'D3',
      floor2BuildingCode: 'D'
    });

    await this.loadConnector({
      code: 'B3C4',
      floor1Code: 'B3',
      floor1BuildingCode: 'B',
      floor2Code: 'C4',
      floor2BuildingCode: 'C'
    });

    await this.loadRoom({
      name: 'B201',
      buildingCode: 'B',
      floorCode: 'B2',
      description: 'Auditório B201',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B203',
      buildingCode: 'B',
      floorCode: 'B2',
      description: 'Sala de Aula B203',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B306',
      buildingCode: 'B',
      floorCode: 'B3',
      description: 'Sala de Aula B306',
      dimensions: {
        width: 2,
        length: 2
      },
      category: 'CLASSROOM'
    });

    await this.loadRoom({
      name: 'B216',
      buildingCode: 'B',
      floorCode: 'B2',
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
      code: 'GUARD',
      nickname: 'ISEP Guard',
      modelCode: 'SRV',
      description: 'ISEP Security Guard',
      serialNumber: 'RBT1',
      isAvailable: true
    });

    await this.loadDevice({
      code: 'DELIVER',
      nickname: 'ISEP Delivery Guy',
      modelCode: 'DLV',
      description: 'ISEP Pick and Delivery Robot',
      serialNumber: 'RBT2',
      isAvailable: true
    });

    await this.loadDevice({
      code: 'MASTER',
      nickname: 'ISEP Master Robot',
      modelCode: 'ALL',
      description: 'ISEP Master All in One Robot',
      serialNumber: 'RBT3',
      isAvailable: true
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

  private async loadRoom(room: IRoomDTO) {
    const roomExists = await this.roomService.getRoom(room.buildingCode, room.floorCode, room.name);

    if (roomExists.isFailure) {
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
}
