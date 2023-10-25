import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RoomDescriptionProps {
  [key: string]: string;
  value: string;
}

export class RoomDescription extends ValueObject<RoomDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoomDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<RoomDescription> {
    if (description.length > 255)
      return Result.fail<RoomDescription>('Room description must be 255 characters or less');
    return Result.ok<RoomDescription>(new RoomDescription({ value: description }));
  }
}
