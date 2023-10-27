import { Entity } from '@/core/domain/Entity';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Result } from '@/core/logic/Result';
import { FloorMapSize } from './floorMapSize';
import { FloorMapExitLocation } from './floorMapExitLocation';
import { FloorMapMatrix } from './floorMapMatrix';
import { FloorMapExits } from './floorMapExits';
import { FloorMapElevators } from './floorMapElevators';

interface FloorMapProps {
  size: FloorMapSize;
  map: FloorMapMatrix;
  exits: FloorMapExits;
  elevators: FloorMapElevators;
  exitLocation: FloorMapExitLocation;
}

export class FloorMap extends Entity<FloorMapProps> {
  get size(): FloorMapSize {
    return this.props.size;
  }

  get map(): FloorMapMatrix {
    return this.props.map;
  }

  get exits(): FloorMapExits {
    return this.props.exits;
  }
  get elevators(): FloorMapElevators {
    return this.props.elevators;
  }
  get exitLocation(): FloorMapExitLocation {
    return this.props.exitLocation;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(props: FloorMapProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    const newMap = new FloorMap(props, id);

    return Result.ok<FloorMap>(newMap);
  }
}
