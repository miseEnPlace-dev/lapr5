import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface FloorDimensionsProps {
  [key: string]: {
    width: number;
    height: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export class FloorDimensions extends ValueObject<FloorDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get height(): number {
    return this.props.dimensions.height;
  }

  private constructor(props: FloorDimensionsProps) {
    super(props);
  }

  public static create(width: number, height: number): Result<FloorDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<FloorDimensions>(widthGuardResult.message);

    const heightGuardResult = Guard.isPositiveNumber(height, 'height');
    if (!heightGuardResult.succeeded)
      return Result.fail<FloorDimensions>(heightGuardResult.message);

    return Result.ok<FloorDimensions>(new FloorDimensions({ dimensions: { width, height } }));
  }
}
