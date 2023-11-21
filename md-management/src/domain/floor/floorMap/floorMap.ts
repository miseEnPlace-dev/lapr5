import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { FloorMaze } from './floorMaze/floorMaze';
import { Entity } from '@/core/domain/Entity';
import { Result } from '@/core/logic/Result';
import { FloorMapPlayer } from './floorMapPlayer';
import { FloorMapDoor } from './floorMapDoor';

interface FloorMapProps {
  floorMaze: FloorMaze;
  player: FloorMapPlayer;
  door: FloorMapDoor;
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

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    const floorMap = new FloorMap(props, id);

    return Result.ok<FloorMap>(floorMap);
  }
}
