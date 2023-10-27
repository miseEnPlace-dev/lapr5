import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceCodeProps {
  [key: string]: string;
  value: string;
}
export class DeviceCode extends ValueObject<DeviceCodeProps> {
  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<DeviceCode> {
    if (value.length > 30)
      return Result.fail<DeviceCode>('Device code must be 30 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(value))
      return Result.fail<DeviceCode>('Device code must be alphanumeric');

    return Result.ok<DeviceCode>(new DeviceCode({ value }));
  }
}
