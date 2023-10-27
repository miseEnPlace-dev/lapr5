import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RoomDimensionsProps {
  [key: string]: {
    width: number;
    length: number;
  };
  dimensions: {
    width: number;
    length: number;
  };
}

export class RoomDimensions extends ValueObject<RoomDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get length(): number {
    return this.props.dimensions.length;
  }

  private constructor(props: RoomDimensionsProps) {
    super(props);
  }

  public static create(width: number, length: number): Result<RoomDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<RoomDimensions>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(length, 'length');
    if (!lengthGuardResult.succeeded) return Result.fail<RoomDimensions>(lengthGuardResult.message);

    return Result.ok<RoomDimensions>(new RoomDimensions({ dimensions: { width, length } }));
  }
}
