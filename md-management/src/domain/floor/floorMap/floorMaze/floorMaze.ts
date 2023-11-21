import { Entity } from '@/core/domain/Entity';
import { Result } from '@/core/logic/Result';
import { FloorMazeSize } from './floorMazeSize';
import { FloorMazeExitLocation } from './floorMazeExitLocation';
import { FloorMazeMatrix } from './floorMazeMatrix';
import { FloorMazeExits } from './floorMazeExits';
import { FloorMazeElevator } from './floorMazeElevator';

interface FloorMazeProps {
  size: FloorMazeSize;
  map: FloorMazeMatrix;
  exits: FloorMazeExits;
  elevator: FloorMazeElevator;
  exitLocation: FloorMazeExitLocation;
}

export class FloorMaze extends Entity<FloorMazeProps> {
  get size(): FloorMazeSize {
    return this.props.size;
  }

  get map(): FloorMazeMatrix {
    return this.props.map;
  }

  get exits(): FloorMazeExits {
    return this.props.exits;
  }
  get elevator(): FloorMazeElevator {
    return this.props.elevator;
  }
  get exitLocation(): FloorMazeExitLocation {
    return this.props.exitLocation;
  }

  private constructor(props: FloorMazeProps) {
    super(props);
  }

  public static create(props: FloorMazeProps): Result<FloorMaze> {
    const newMap = new FloorMaze(props);

    return Result.ok<FloorMaze>(newMap);
  }
}
