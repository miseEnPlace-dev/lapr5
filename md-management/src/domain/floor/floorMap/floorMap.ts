import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { FloorMaze } from './floorMaze/floorMaze';
import { Entity } from '@/core/domain/Entity';
import { Result } from '@/core/logic/Result';
import { FLoorMapPlayer } from './floorMapPlayer';

interface floorMapProps {
  floorMaze: FloorMaze;
  player: FLoorMapPlayer;
}

export class FloorMap extends Entity<floorMapProps> {
  private constructor(props: floorMapProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get floorMaze(): FloorMaze {
    return this.props.floorMaze;
  }

  get player(): FLoorMapPlayer {
    return this.props.player;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(props: floorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    const floorMap = new FloorMap(props, id);

    return Result.ok<FloorMap>(floorMap);
  }
}
