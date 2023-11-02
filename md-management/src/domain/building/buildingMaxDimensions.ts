import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface BuildingMaxDimensionsProps {
  [key: string]: {
    width: number;
    length: number;
  };
  dimensions: {
    width: number;
    length: number;
  };
}

export class BuildingMaxDimensions extends ValueObject<BuildingMaxDimensionsProps> {
  get width(): number {
    return this.props.dimensions.width;
  }

  get length(): number {
    return this.props.dimensions.length;
  }

  private constructor(props: BuildingMaxDimensionsProps) {
    super(props);
  }

  public static create(width: number, length: number): Result<BuildingMaxDimensions> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'Width');
    if (!widthGuardResult.succeeded)
      return Result.fail<BuildingMaxDimensions>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(length, 'Length');
    if (!lengthGuardResult.succeeded)
      return Result.fail<BuildingMaxDimensions>(lengthGuardResult.message);

    return Result.ok<BuildingMaxDimensions>(
      new BuildingMaxDimensions({ dimensions: { width, length } })
    );
  }
}
