import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeviceNicknameProps {
  [key: string]: string;
  value: string;
}

export class DeviceNickname extends ValueObject<DeviceNicknameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeviceNicknameProps) {
    super(props);
  }

  public static create(nickname: string): Result<DeviceNickname> {
    if (nickname.length > 50)
      return Result.fail<DeviceNickname>('Device nickname must be 50 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(nickname))
      return Result.fail<DeviceNickname>('Device nickname must be alphanumeric');
    return Result.ok<DeviceNickname>(new DeviceNickname({ value: nickname }));
  }
}
