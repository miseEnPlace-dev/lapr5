import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { FloorCode } from '../floor/floorCode';

interface CoordinatesProps {
  [key: string]: {
    width: number;
    length: number;
    floorCode: FloorCode;
  };
  coordinates: {
    width: number;
    length: number;
    floorCode: FloorCode;
  };
}

export class Coordinates extends ValueObject<CoordinatesProps> {
  get width(): number {
    return this.props.coordinates.width;
  }

  get length(): number {
    return this.props.coordinates.length;
  }

  get floorCode(): FloorCode {
    return this.props.coordinates.floorCode;
  }

  private constructor(props: CoordinatesProps) {
    super(props);
  }

  public static create(width: number, length: number, floorCode: FloorCode): Result<Coordinates> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'Width');
    if (!widthGuardResult.succeeded) return Result.fail<Coordinates>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(length, 'Length');
    if (!lengthGuardResult.succeeded) return Result.fail<Coordinates>(lengthGuardResult.message);

    const floorCodeGuardResult = Guard.againstNullOrUndefined(floorCode, 'Floor code');
    if (!floorCodeGuardResult.succeeded)
      return Result.fail<Coordinates>(floorCodeGuardResult.message);

    return Result.ok<Coordinates>(new Coordinates({ coordinates: { width, length, floorCode } }));
  }
}
