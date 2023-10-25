import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RoomDimensionsProps {
  [key: string]: {
    width: number;
    height: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export class RoomDimensions extends ValueObject<RoomDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get height(): number {
    return this.props.dimensions.height;
  }

  private constructor(props: RoomDimensionsProps) {
    super(props);
  }

  public static create(width: number, height: number): Result<RoomDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<RoomDimensions>(widthGuardResult.message);

    const heightGuardResult = Guard.isPositiveNumber(height, 'height');
    if (!heightGuardResult.succeeded) return Result.fail<RoomDimensions>(heightGuardResult.message);

    return Result.ok<RoomDimensions>(new RoomDimensions({ dimensions: { width, height } }));
  }
}
