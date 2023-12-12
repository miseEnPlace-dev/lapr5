import { ValueObject } from '@/core/domain/ValueObject';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';

interface CoordinatesProps {
  [key: string]: {
    width: number;
    length: number;
  };
  coordinates: {
    width: number;
    length: number;
  };
}

export class Coordinates extends ValueObject<CoordinatesProps> {
  get width(): number {
    return this.props.coordinates.width;
  }

  get length(): number {
    return this.props.coordinates.length;
  }

  private constructor(props: CoordinatesProps) {
    super(props);
  }

  public static create(width: number, length: number): Result<Coordinates> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'Width');
    if (!widthGuardResult.succeeded) return Result.fail<Coordinates>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(length, 'Length');
    if (!lengthGuardResult.succeeded) return Result.fail<Coordinates>(lengthGuardResult.message);

    return Result.ok<Coordinates>(new Coordinates({ coordinates: { width, length } }));
  }
}
