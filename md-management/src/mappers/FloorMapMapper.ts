import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMap } from '@/domain/floor/floorMap/floorMap';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import { IFloorMapPersistence } from '@/dataschema/IFloorMapPersistence';
import { FloorMazeSize } from '@/domain/floor/floorMap/floorMaze/floorMazeSize';
import { FloorMazeElevator } from '@/domain/floor/floorMap/floorMaze/floorMazeElevator';
import { FloorMazeExitLocation } from '@/domain/floor/floorMap/floorMaze/floorMazeExitLocation';
import { FloorMazeExits } from '@/domain/floor/floorMap/floorMaze/floorMazeExits';
import { FloorMazeMatrix } from '@/domain/floor/floorMap/floorMaze/floorMazeMatrix';
import { FloorMaze } from '@/domain/floor/floorMap/floorMaze/floorMaze';
import { FloorMapPlayer } from '@/domain/floor/floorMap/floorMapPlayer';
import { FloorMapDoor } from '@/domain/floor/floorMap/floorMapDoor';
import { FloorMapElevator } from '@/domain/floor/floorMap/floorMapElevator';
import { FloorMapWall } from '@/domain/floor/floorMap/floorMapWall';
import { FloorMapGround } from '@/domain/floor/floorMap/floorMapGround';

export class FloorMapMapper extends Mapper<FloorMap> {
  public static toDTO(floorMap: FloorMap): IFloorMapDTO {
    return {
      maze: {
        size: {
          width: floorMap.floorMaze.size.width,
          depth: floorMap.floorMaze.size.depth
        },
        map: floorMap.floorMaze.map.matrix,
        exits: floorMap.floorMaze.exits.exits,
        elevator: {
          x: floorMap.floorMaze.elevator.x,
          y: floorMap.floorMaze.elevator.y
        },
        exitLocation: {
          x: floorMap.floorMaze.exitLocation.x,
          y: floorMap.floorMaze.exitLocation.y
        }
      },
      player: {
        initialPosition: [floorMap.player.initialPosition.x, floorMap.player.initialPosition.y] as [
          number,
          number
        ],
        initialDirection: floorMap.player.initialDirection
      },
      door: {
        url: floorMap.door.url,
        scale: {
          x: floorMap.door.scale.x,
          y: floorMap.door.scale.y,
          z: floorMap.door.scale.z
        }
      },
      elevator: {
        url: floorMap.elevator.url,
        scale: {
          x: floorMap.elevator.scale.x,
          y: floorMap.elevator.scale.y,
          z: floorMap.elevator.scale.z
        }
      },
      wall: {
        segments: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        primaryColor: floorMap.wall.primaryColor,
        maps: {
          color: {
            url: floorMap.wall.maps.color.url
          },
          ao: {
            url: floorMap.wall.maps.ao.url,
            intensity: floorMap.wall.maps.ao.intensity
          },
          displacement: {
            url: floorMap.wall.maps.displacement.url,
            scale: floorMap.wall.maps.displacement.scale,
            bias: floorMap.wall.maps.displacement.bias
          },
          normal: {
            url: floorMap.wall.maps.normal.url,
            type: floorMap.wall.maps.normal.type,
            scale: {
              x: floorMap.wall.maps.normal.scale.x,
              y: floorMap.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: floorMap.wall.maps.bump.url,
            scale: floorMap.wall.maps.bump.scale
          },
          roughness: {
            url: floorMap.wall.maps.roughness.url,
            rough: floorMap.wall.maps.roughness.rough
          }
        },
        wrapS: floorMap.wall.wrapS,
        wrapT: floorMap.wall.wrapT,
        repeat: {
          u: floorMap.wall.repeat.u,
          v: floorMap.wall.repeat.v
        },
        magFilter: floorMap.wall.magFilter,
        minFilter: floorMap.wall.minFilter,
        secondaryColor: floorMap.wall.secondaryColor
      },
      ground: {
        size: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        segments: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        primaryColor: floorMap.wall.primaryColor,
        maps: {
          color: {
            url: floorMap.wall.maps.color.url
          },
          ao: {
            url: floorMap.wall.maps.ao.url,
            intensity: floorMap.wall.maps.ao.intensity
          },
          displacement: {
            url: floorMap.wall.maps.displacement.url,
            scale: floorMap.wall.maps.displacement.scale,
            bias: floorMap.wall.maps.displacement.bias
          },
          normal: {
            url: floorMap.wall.maps.normal.url,
            type: floorMap.wall.maps.normal.type,
            scale: {
              x: floorMap.wall.maps.normal.scale.x,
              y: floorMap.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: floorMap.wall.maps.bump.url,
            scale: floorMap.wall.maps.bump.scale
          },
          roughness: {
            url: floorMap.wall.maps.roughness.url,
            rough: floorMap.wall.maps.roughness.rough
          }
        },
        wrapS: floorMap.wall.wrapS,
        wrapT: floorMap.wall.wrapT,
        repeat: {
          u: floorMap.wall.repeat.u,
          v: floorMap.wall.repeat.v
        },
        magFilter: floorMap.wall.magFilter,
        minFilter: floorMap.wall.minFilter,
        secondaryColor: floorMap.wall.secondaryColor
      }
    };
  }

  public static async toDomain(floorMap: IFloorMapPersistence): Promise<FloorMap | null> {
    const size = FloorMazeSize.create(
      floorMap.maze.size.width,
      floorMap.maze.size.depth
    ).getValue();

    const mapMatrix = FloorMazeMatrix.create(floorMap.maze.map).getValue();

    const exits = FloorMazeExits.create(floorMap.maze.exits).getValue();

    const exitLocation = FloorMazeExitLocation.create(
      floorMap.maze.exitLocation.x,
      floorMap.maze.exitLocation.y
    ).getValue();

    const elevator = FloorMazeElevator.create(
      floorMap.maze.elevator.x,
      floorMap.maze.elevator.y
    ).getValue();

    const floorMaze = FloorMaze.create({
      size,
      map: mapMatrix,
      exits,
      exitLocation,
      elevator
    }).getValue();

    const floorMapDoor = FloorMapDoor.create({
      url: floorMap.door.url,
      scale: {
        x: floorMap.door.scale.x,
        y: floorMap.door.scale.y,
        z: floorMap.door.scale.z
      }
    });

    const floorMapElevator = FloorMapElevator.create({
      url: floorMap.elevator.url,
      scale: {
        x: floorMap.elevator.scale.x,
        y: floorMap.elevator.scale.y,
        z: floorMap.elevator.scale.z
      }
    });

    const player = FloorMapPlayer.create({
      initialPosition: {
        x: floorMap.player.initialPosition.x,
        y: floorMap.player.initialPosition.y
      },
      initialDirection: floorMap.player.initialDirection
    });

    const wall = FloorMapWall.create({
      segments: {
        width: floorMap.wall.segments.width,
        height: floorMap.wall.segments.height,
        depth: floorMap.wall.segments.depth
      },
      primaryColor: floorMap.wall.primaryColor,
      maps: {
        color: {
          url: floorMap.wall.maps.color.url
        },
        ao: {
          url: floorMap.wall.maps.ao.url,
          intensity: floorMap.wall.maps.ao.intensity
        },
        displacement: {
          url: floorMap.wall.maps.displacement.url,
          scale: floorMap.wall.maps.displacement.scale,
          bias: floorMap.wall.maps.displacement.bias
        },
        normal: {
          url: floorMap.wall.maps.normal.url,
          type: floorMap.wall.maps.normal.tipo,
          scale: {
            x: floorMap.wall.maps.normal.scale.x,
            y: floorMap.wall.maps.normal.scale.y
          }
        },
        bump: {
          url: floorMap.wall.maps.bump.url,
          scale: floorMap.wall.maps.bump.scale
        },
        roughness: {
          url: floorMap.wall.maps.roughness.url,
          rough: floorMap.wall.maps.roughness.rough
        }
      },
      wrapS: floorMap.wall.wrapS,
      wrapT: floorMap.wall.wrapT,
      repeat: {
        u: floorMap.wall.repeat.u,
        v: floorMap.wall.repeat.v
      },
      magFilter: floorMap.wall.magFilter,
      minFilter: floorMap.wall.minFilter,
      secondaryColor: floorMap.wall.secondaryColor
    });

    const ground = FloorMapGround.create({
      size: {
        width: floorMap.wall.segments.width,
        height: floorMap.wall.segments.height,
        depth: floorMap.wall.segments.depth
      },
      segments: {
        width: floorMap.wall.segments.width,
        height: floorMap.wall.segments.height,
        depth: floorMap.wall.segments.depth
      },
      primaryColor: floorMap.wall.primaryColor,
      maps: {
        color: {
          url: floorMap.wall.maps.color.url
        },
        ao: {
          url: floorMap.wall.maps.ao.url,
          intensity: floorMap.wall.maps.ao.intensity
        },
        displacement: {
          url: floorMap.wall.maps.displacement.url,
          scale: floorMap.wall.maps.displacement.scale,
          bias: floorMap.wall.maps.displacement.bias
        },
        normal: {
          url: floorMap.wall.maps.normal.url,
          type: floorMap.wall.maps.normal.tipo,
          scale: {
            x: floorMap.wall.maps.normal.scale.x,
            y: floorMap.wall.maps.normal.scale.y
          }
        },
        bump: {
          url: floorMap.wall.maps.bump.url,
          scale: floorMap.wall.maps.bump.scale
        },
        roughness: {
          url: floorMap.wall.maps.roughness.url,
          rough: floorMap.wall.maps.roughness.rough
        }
      },
      wrapS: floorMap.wall.wrapS,
      wrapT: floorMap.wall.wrapT,
      repeat: {
        u: floorMap.wall.repeat.u,
        v: floorMap.wall.repeat.v
      },
      magFilter: floorMap.wall.magFilter,
      minFilter: floorMap.wall.minFilter,
      secondaryColor: floorMap.wall.secondaryColor
    });

    const floorMapOrError = FloorMap.create(
      { floorMaze, player, door: floorMapDoor, elevator: floorMapElevator, wall, ground },
      new UniqueEntityID(floorMap.domainId)
    );

    floorMapOrError.isFailure && console.log(floorMapOrError.error);

    return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
  }

  public static toPersistence(floorMap: FloorMap): IFloorMapPersistence {
    return {
      domainId: floorMap.id.toString(),
      maze: {
        size: {
          width: floorMap.floorMaze.size.width,
          depth: floorMap.floorMaze.size.depth
        },
        map: floorMap.floorMaze.map.matrix,
        exits: floorMap.floorMaze.exits.exits,
        elevator: {
          x: floorMap.floorMaze.elevator.x,
          y: floorMap.floorMaze.elevator.y
        },
        exitLocation: {
          x: floorMap.floorMaze.exitLocation.x,
          y: floorMap.floorMaze.exitLocation.y
        }
      },
      player: {
        initialPosition: {
          x: floorMap.player.initialPosition.x,
          y: floorMap.player.initialPosition.y
        },
        initialDirection: floorMap.player.initialDirection
      },
      door: {
        url: floorMap.door.url,
        scale: {
          x: floorMap.door.scale.x,
          y: floorMap.door.scale.y,
          z: floorMap.door.scale.z
        }
      },
      elevator: {
        url: floorMap.door.url,
        scale: {
          x: floorMap.door.scale.x,
          y: floorMap.door.scale.y,
          z: floorMap.door.scale.z
        }
      },
      wall: {
        segments: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        primaryColor: floorMap.wall.primaryColor,
        maps: {
          color: {
            url: floorMap.wall.maps.color.url
          },
          ao: {
            url: floorMap.wall.maps.ao.url,
            intensity: floorMap.wall.maps.ao.intensity
          },
          displacement: {
            url: floorMap.wall.maps.displacement.url,
            scale: floorMap.wall.maps.displacement.scale,
            bias: floorMap.wall.maps.displacement.bias
          },
          normal: {
            url: floorMap.wall.maps.normal.url,
            tipo: floorMap.wall.maps.normal.type,
            scale: {
              x: floorMap.wall.maps.normal.scale.x,
              y: floorMap.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: floorMap.wall.maps.bump.url,
            scale: floorMap.wall.maps.bump.scale
          },
          roughness: {
            url: floorMap.wall.maps.roughness.url,
            rough: floorMap.wall.maps.roughness.rough
          }
        },
        wrapS: floorMap.wall.wrapS,
        wrapT: floorMap.wall.wrapT,
        repeat: {
          u: floorMap.wall.repeat.u,
          v: floorMap.wall.repeat.v
        },
        magFilter: floorMap.wall.magFilter,
        minFilter: floorMap.wall.minFilter,
        secondaryColor: floorMap.wall.secondaryColor
      },
      ground: {
        size: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        segments: {
          width: floorMap.wall.segments.width,
          height: floorMap.wall.segments.height,
          depth: floorMap.wall.segments.depth
        },
        primaryColor: floorMap.wall.primaryColor,
        maps: {
          color: {
            url: floorMap.wall.maps.color.url
          },
          ao: {
            url: floorMap.wall.maps.ao.url,
            intensity: floorMap.wall.maps.ao.intensity
          },
          displacement: {
            url: floorMap.wall.maps.displacement.url,
            scale: floorMap.wall.maps.displacement.scale,
            bias: floorMap.wall.maps.displacement.bias
          },
          normal: {
            url: floorMap.wall.maps.normal.url,
            tipo: floorMap.wall.maps.normal.type,
            scale: {
              x: floorMap.wall.maps.normal.scale.x,
              y: floorMap.wall.maps.normal.scale.y
            }
          },
          bump: {
            url: floorMap.wall.maps.bump.url,
            scale: floorMap.wall.maps.bump.scale
          },
          roughness: {
            url: floorMap.wall.maps.roughness.url,
            rough: floorMap.wall.maps.roughness.rough
          }
        },
        wrapS: floorMap.wall.wrapS,
        wrapT: floorMap.wall.wrapT,
        repeat: {
          u: floorMap.wall.repeat.u,
          v: floorMap.wall.repeat.v
        },
        magFilter: floorMap.wall.magFilter,
        minFilter: floorMap.wall.minFilter,
        secondaryColor: floorMap.wall.secondaryColor
      }
    };
  }
}
