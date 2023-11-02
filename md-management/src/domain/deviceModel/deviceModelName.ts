import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceModelNameProps {
  [key: string]: string;
  value: string;
}

export class DeviceModelName extends ValueObject<DeviceModelNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeviceModelNameProps) {
    super(props);
  }

  public static create(name: string): Result<DeviceModelName> {
    if (name.length > 100)
      return Result.fail<DeviceModelName>('Device Model name must be 100 characters or less');
    return Result.ok<DeviceModelName>(new DeviceModelName({ value: name }));
  }
}
