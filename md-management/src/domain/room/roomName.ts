import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RoomNameProps {
  [key: string]: string;
  value: string;
}

export class RoomName extends ValueObject<RoomNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoomNameProps) {
    super(props);
  }

  public static create(name: string): Result<RoomName> {
    if (name.length > 50) return Result.fail<RoomName>('Room name must be 50 characters or less');

    return Result.ok<RoomName>(new RoomName({ value: name }));
  }
}
