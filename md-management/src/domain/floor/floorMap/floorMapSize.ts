import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface FloorMapSizeProps {
  [key: string]: {
    width: number;
    depth: number;
  };
  size: {
    width: number;
    depth: number;
  };
}

export class FloorMapSize extends ValueObject<FloorMapSizeProps> {
  get width(): number {
    return this.props.size.width;
  }

  get depth(): number {
    return this.props.size.depth;
  }

  private constructor(props: FloorMapSizeProps) {
    super(props);
  }

  public static create(width: number, depth: number): Result<FloorMapSize> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<FloorMapSize>(widthGuardResult.message);

    const depthGuardResult = Guard.isPositiveNumber(depth, 'depth');
    if (!depthGuardResult.succeeded) return Result.fail<FloorMapSize>(depthGuardResult.message);

    return Result.ok<FloorMapSize>(new FloorMapSize({ size: { width, depth } }));
  }
}
