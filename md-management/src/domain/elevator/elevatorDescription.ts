import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface ElevatorDescriptionProps {
  [key: string]: string;
  value: string;
}

export class ElevatorDescription extends ValueObject<ElevatorDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ElevatorDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<ElevatorDescription> {
    if (description.length > 255)
      return Result.fail<ElevatorDescription>(
        'Building description must be 255 characters or less'
      );
    return Result.ok<ElevatorDescription>(new ElevatorDescription({ value: description }));
  }
}
