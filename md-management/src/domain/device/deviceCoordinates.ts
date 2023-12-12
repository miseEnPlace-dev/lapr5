import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { FloorCode } from '../floor/floorCode';

interface CoordinatesProps {
  [key: string]: {
    width: number;
    depth: number;
    floorCode: FloorCode;
  };
  coordinates: {
    width: number;
    depth: number;
    floorCode: FloorCode;
  };
}

export class DeviceCoordinates extends ValueObject<CoordinatesProps> {
  get width(): number {
    return this.props.coordinates.width;
  }

  get depth(): number {
    return this.props.coordinates.depth;
  }

  get floorCode(): FloorCode {
    return this.props.coordinates.floorCode;
  }

  private constructor(props: CoordinatesProps) {
    super(props);
  }

  public static create(
    width: number,
    depth: number,
    floorCode: FloorCode
  ): Result<DeviceCoordinates> {
    const widthGuardResult = Guard.isPositiveNumber(width, 'Width');
    if (!widthGuardResult.succeeded)
      return Result.fail<DeviceCoordinates>(widthGuardResult.message);

    const lengthGuardResult = Guard.isPositiveNumber(depth, 'Depth');
    if (!lengthGuardResult.succeeded)
      return Result.fail<DeviceCoordinates>(lengthGuardResult.message);

    const floorCodeGuardResult = Guard.againstNullOrUndefined(floorCode, 'Floor code');
    if (!floorCodeGuardResult.succeeded)
      return Result.fail<DeviceCoordinates>(floorCodeGuardResult.message);

    return Result.ok<DeviceCoordinates>(
      new DeviceCoordinates({ coordinates: { width, depth, floorCode } })
    );
  }
}
