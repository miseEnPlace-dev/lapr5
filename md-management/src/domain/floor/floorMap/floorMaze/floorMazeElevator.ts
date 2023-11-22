import { ValueObject } from '../../../../core/domain/ValueObject';
import { Guard } from '../../../../core/logic/Guard';
import { Result } from '../../../../core/logic/Result';

interface FloorMazeElevatorProps {
  [key: string]: number;
  x: number;
  y: number;
}

export class FloorMazeElevator extends ValueObject<FloorMazeElevatorProps> {
  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  private constructor(props: FloorMazeElevatorProps) {
    super(props);
  }

  public static create(x: number, y: number): Result<FloorMazeElevator> {
    const elevatorXOrError = Guard.againstNullOrUndefined(x, 'elevatorX');
    const elevatorYOrError = Guard.againstNullOrUndefined(y, 'elevatorY');

    if (!elevatorXOrError.succeeded) {
      return Result.fail<FloorMazeElevator>(elevatorXOrError.message);
    }

    if (!elevatorYOrError.succeeded) {
      return Result.fail<FloorMazeElevator>(elevatorYOrError.message);
    }

    return Result.ok<FloorMazeElevator>(new FloorMazeElevator({ x, y }));
  }
}
