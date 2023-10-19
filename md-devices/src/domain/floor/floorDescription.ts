import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface FloorDescriptionProps {
  [key: string]: string;
  value: string;
}

export class FloorDescription extends ValueObject<FloorDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: FloorDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<FloorDescription> {
    if (description.length > 255)
      throw new Error('Floor description must be 255 characters or less.');
    return Result.ok<FloorDescription>(new FloorDescription({ value: description }));
  }
}
