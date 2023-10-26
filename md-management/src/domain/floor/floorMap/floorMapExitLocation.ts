import { ValueObject } from '@/core/domain/ValueObject';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';

interface FloorMapExitLocationProps {
  [key: string]: {
    x: number;
    y: number;
  };
  exitLocation: {
    x: number;
    y: number;
  };
}

export class FloorMapExitLocation extends ValueObject<FloorMapExitLocationProps> {
  get x(): number {
    return this.props.exitLocation.x;
  }

  get y(): number {
    return this.props.exitLocation.y;
  }

  private constructor(props: FloorMapExitLocationProps) {
    super(props);
  }

  public static create(x: number, y: number): Result<FloorMapExitLocation> {
    const xGuardResult = Guard.isPositiveNumber(x, 'x');
    if (!xGuardResult.succeeded) return Result.fail<FloorMapExitLocation>(xGuardResult.message);

    const yGuardResult = Guard.isPositiveNumber(y, 'y');
    if (!yGuardResult.succeeded) return Result.fail<FloorMapExitLocation>(yGuardResult.message);

    return Result.ok<FloorMapExitLocation>(new FloorMapExitLocation({ exitLocation: { x, y } }));
  }
}
