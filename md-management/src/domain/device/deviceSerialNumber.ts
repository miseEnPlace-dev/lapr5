import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceSerialNumberProps {
  [key: string]: string;
  value: string;
}

export class DeviceSerialNumber extends ValueObject<DeviceSerialNumberProps> {
  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<DeviceSerialNumber> {
    if (value.length > 50)
      return Result.fail<DeviceSerialNumber>('Device serial number must be 50 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(value))
      return Result.fail<DeviceSerialNumber>('Device serial number must be alphanumeric');

    return Result.ok<DeviceSerialNumber>(new DeviceSerialNumber({ value }));
  }
}
