import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceDescriptionProps {
  [key: string]: string;
  value: string;
}

export class DeviceDescription extends ValueObject<DeviceDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeviceDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<DeviceDescription> {
    if (description.length > 250)
      return Result.fail<DeviceDescription>('Device description must be 255 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(description))
      return Result.fail<DeviceDescription>('Device description must be alphanumeric');
    return Result.ok<DeviceDescription>(new DeviceDescription({ value: description }));
  }
}
