import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface FloorDimensionsProps {
  [key: string]: {
    width: number;
    length: number;
  };
  dimensions: {
    width: number;
    length: number;
  };
}

export class FloorDimensions extends ValueObject<FloorDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get length(): number {
    return this.props.dimensions.length;
  }

  private constructor(props: FloorDimensionsProps) {
    super(props);
  }

  public static create(width: number, length: number): Result<FloorDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<FloorDimensions>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(length, 'length');
    if (!lengthGuardResult.succeeded)
      return Result.fail<FloorDimensions>(lengthGuardResult.message);

    return Result.ok<FloorDimensions>(new FloorDimensions({ dimensions: { width, length } }));
  }
}
