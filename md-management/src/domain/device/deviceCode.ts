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

  private constructor(props: DeviceCodeProps) {
    super(props);
  }

  public static create(id: string): Result<DeviceCode> {
    if (id.length > 5) return Result.fail<DeviceCode>('Floor code must be 5 characters or less');

    if (!/^[a-zA-Z0-9\t\s]+$/.test(id))
      return Result.fail<DeviceCode>('Floor code must be alphanumeric');

    return Result.ok<DeviceCode>(new DeviceCode({ value: id }));
  }
}
