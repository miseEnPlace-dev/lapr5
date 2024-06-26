import { ValueObject } from '../../../../core/domain/ValueObject';
import { Guard } from '../../../../core/logic/Guard';
import { Result } from '../../../../core/logic/Result';

interface FloorMazeSizeProps {
  [key: string]: {
    width: number;
    depth: number;
  };
  size: {
    width: number;
    depth: number;
  };
}

export class FloorMazeSize extends ValueObject<FloorMazeSizeProps> {
  get width(): number {
    return this.props.size.width;
  }

  get depth(): number {
    return this.props.size.depth;
  }

  private constructor(props: FloorMazeSizeProps) {
    super(props);
  }

  public static create(width: number, depth: number): Result<FloorMazeSize> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'width');
    if (!widthGuardResult.succeeded) return Result.fail<FloorMazeSize>(widthGuardResult.message);

    const depthGuardResult = Guard.isPositiveNumber(depth, 'depth');
    if (!depthGuardResult.succeeded) return Result.fail<FloorMazeSize>(depthGuardResult.message);

    return Result.ok<FloorMazeSize>(new FloorMazeSize({ size: { width, depth } }));
  }
}
