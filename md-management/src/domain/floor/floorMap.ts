import { Entity } from '@/core/domain/Entity';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Result } from '@/core/logic/Result';

interface FloorMapProps {
  size: {
    width: number;
    depth: number;
  };
  map: number[][];
  exits: number[][];
  elevators: number[][];
  exitLocation: number[];
}

export class FloorMap extends Entity<FloorMapProps> {
  get size(): { width: number; depth: number } {
    return this.props.size;
  }

  get map(): number[][] {
    return this.props.map;
  }

  get exits(): number[][] {
    return this.props.exits;
  }
  get elevators(): number[][] {
    return this.props.elevators;
  }
  get exitLocation(): number[] {
    return this.props.exitLocation;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(props: FloorMapProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    if (!this.validateSize(props.size)) return Result.fail<FloorMap>('Size is invalid');
    if (!this.validateMap(props.map)) return Result.fail<FloorMap>('Map is invalid');
    if (!this.validateExits(props.exits)) return Result.fail<FloorMap>('Exits is invalid');
    if (!this.validateElevators(props.elevators))
      return Result.fail<FloorMap>('Elevators is invalid');
    if (!this.validateExitLocation(props.exitLocation))
      return Result.fail<FloorMap>('Exit location is invalid');

    const newMap = new FloorMap(props, id);

    return Result.ok<FloorMap>(newMap);
  }

  private static validateSize(size: { width: number; depth: number }): boolean {
    if (size.width < 0 || size.depth < 0) return false;

    return true;
  }

  private static validateMap(map: number[][]): boolean {
    if (map.length < 0) return false;

    map.forEach(row => {
      if (row.length < 0) return false;
      row.forEach(cell => {
        // Cell can only be 0, 1, 2, 3
        if (cell < 0 || cell > 3) return false;
      });
    });
    return true;
  }

  private static validateExits(exits: number[][]): boolean {
    if (exits.length < 0) return false;

    exits.forEach(row => {
      if (row.length != 2) return false;
      row.forEach(cell => {
        if (cell < 0) return false;
      });
    });

    return true;
  }

  private static validateElevators(elevators: number[][]): boolean {
    // Floors can only have one elevator
    if (elevators.length != 1 || elevators[0].length != 2) return false;
    return true;
  }

  private static validateExitLocation(exitLocation: number[]): boolean {
    if (exitLocation.length != 2) return false;
    return true;
  }
}
