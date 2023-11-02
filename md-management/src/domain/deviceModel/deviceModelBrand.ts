import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceModelBrandProps {
  [key: string]: string;
  value: string;
}

export class DeviceModelBrand extends ValueObject<DeviceModelBrandProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeviceModelBrandProps) {
    super(props);
  }

  public static create(brand: string): Result<DeviceModelBrand> {
    if (brand.length > 50)
      return Result.fail<DeviceModelBrand>('Device Model brand must be 50 characters or less');
    return Result.ok<DeviceModelBrand>(new DeviceModelBrand({ value: brand }));
  }
}
