import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface BuildingMaxDimensionsProps {
  [key: string]: {
    width: number;
    height: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export class BuildingMaxDimensions extends ValueObject<BuildingMaxDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get height(): number {
    return this.props.dimensions.height;
  }

  private constructor(props: BuildingMaxDimensionsProps) {
    super(props);
  }

  public static create(width: number, height: number): Result<BuildingMaxDimensions> {
    const guardResult =
      Guard.isPositiveNumber(width, 'width') && Guard.isPositiveNumber(height, 'height');

    if (!guardResult.succeeded) return Result.fail<BuildingMaxDimensions>(guardResult.message);

    return Result.ok<BuildingMaxDimensions>(
      new BuildingMaxDimensions({ dimensions: { width, height } })
    );
  }
}
