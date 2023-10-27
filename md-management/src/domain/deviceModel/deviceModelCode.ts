import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceModelCodeProps {
  [key: string]: string;
  value: string;
}

export class DeviceModelCode extends ValueObject<DeviceModelCodeProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeviceModelCodeProps) {
    super(props);
  }

  public static create(code: string): Result<DeviceModelCode> {
    if (code.length > 25)
      return Result.fail<DeviceModelCode>('Device code must be 25 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(code))
      return Result.fail<DeviceModelCode>('Device code must be alphanumeric');

    return Result.ok<DeviceModelCode>(new DeviceModelCode({ value: code }));
  }
}
