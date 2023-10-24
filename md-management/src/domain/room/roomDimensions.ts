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

  public static create(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): Result<RoomDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<RoomDimensions>(widthGuardResult.message);

    const heightGuardResult = Guard.isPositiveNumber(height, 'height');
    if (!heightGuardResult.succeeded) return Result.fail<RoomDimensions>(heightGuardResult.message);

    if (width > maxWidth)
      return Result.fail<RoomDimensions>('Floor width is bigger than the building width');

    if (height > maxHeight)
      return Result.fail<RoomDimensions>('Floor height is bigger than the building height');

    return Result.ok<RoomDimensions>(new RoomDimensions({ dimensions: { width, height } }));
  }
}
