import { ValueObject } from '../../../../core/domain/ValueObject';
import { Guard } from '../../../../core/logic/Guard';
import { Result } from '../../../../core/logic/Result';

interface FloorMazeExitLocationProps {
  [key: string]: {
    x: number;
    y: number;
  };
  exitLocation: {
    x: number;
    y: number;
  };
}

export class FloorMazeExitLocation extends ValueObject<FloorMazeExitLocationProps> {
  get x(): number {
    return this.props.exitLocation.x;
  }

  get y(): number {
    return this.props.exitLocation.y;
  }

  private constructor(props: FloorMazeExitLocationProps) {
    super(props);
  }

  public static create(x: number, y: number): Result<FloorMazeExitLocation> {
    const xGuardResult = Guard.isPositiveNumber(x, 'x');
    if (!xGuardResult.succeeded) return Result.fail<FloorMazeExitLocation>(xGuardResult.message);

    const yGuardResult = Guard.isPositiveNumber(y, 'y');
    if (!yGuardResult.succeeded) return Result.fail<FloorMazeExitLocation>(yGuardResult.message);

    return Result.ok<FloorMazeExitLocation>(new FloorMazeExitLocation({ exitLocation: { x, y } }));
  }
}
