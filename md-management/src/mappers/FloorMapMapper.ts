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

export class FloorMapMapper extends Mapper<FloorMap> {
  public static toDTO(floorMap: FloorMap): IFloorMapDTO {
    return {
      maze: {
        size: {
          width: floorMap.floorMaze.size.width,
          depth: floorMap.floorMaze.size.depth
        },
        map: floorMap.floorMaze.map.matrix,
        exits: floorMap.floorMaze.exits.exits.map(exit => [exit.x, exit.y] as [number, number]),
        elevator: [floorMap.floorMaze.elevator.x, floorMap.floorMaze.elevator.y] as [
          number,
          number
        ],
        exitLocation: [floorMap.floorMaze.exitLocation.x, floorMap.floorMaze.exitLocation.y] as [
          number,
          number
        ]
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

    const door = FloorMapDoor.create({
      url: floorMap.door.url,
      scale: {
        x: floorMap.door.scale.x,
        y: floorMap.door.scale.y,
        z: floorMap.door.scale.z
      }
    });

    console.log(floorMap);

    const player = FloorMapPlayer.create({
      initialPosition: {
        x: floorMap.player.initialPosition.x,
        y: floorMap.player.initialPosition.y
      },
      initialDirection: floorMap.player.initialDirection
    });

    const floorMapOrError = FloorMap.create(
      { floorMaze, player, door },
      new UniqueEntityID(floorMap.domainId)
    );

    floorMapOrError.isFailure && console.log(floorMapOrError.error);

    return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
  }

  public static toPersistence(floorMap: FloorMap): IFloorMapPersistence {
    console.log(floorMap.door);
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
      }
    };
  }
}
