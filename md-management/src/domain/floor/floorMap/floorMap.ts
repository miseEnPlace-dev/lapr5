import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { FloorMaze } from './floorMaze/floorMaze';
import { Entity } from '@/core/domain/Entity';
import { Result } from '@/core/logic/Result';
import { FloorMapPlayer } from './floorMapPlayer';
import { FloorMapDoor } from './floorMapDoor';
import { FloorMapElevator } from './floorMapElevator';
import { FloorMapWall } from './floorMapWall';
import { FloorMapGround } from './floorMapGround';

interface FloorMapProps {
  floorMaze: FloorMaze;
  player: FloorMapPlayer;
  door: FloorMapDoor;
  elevator: FloorMapElevator;
  wall: FloorMapWall;
  ground: FloorMapGround;
}

export class FloorMap extends Entity<FloorMapProps> {
  private constructor(props: FloorMapProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get floorMaze(): FloorMaze {
    return this.props.floorMaze;
  }

  get player(): FloorMapPlayer {
    return this.props.player;
  }

  get door(): FloorMapDoor {
    return this.props.door;
  }

  get elevator(): FloorMapElevator {
    return this.props.elevator;
  }

  get wall(): FloorMapWall {
    return this.props.wall;
  }

  get ground(): FloorMapGround {
    return this.props.ground;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    const floorMap = new FloorMap(props, id);

    return Result.ok<FloorMap>(floorMap);
  }
}
