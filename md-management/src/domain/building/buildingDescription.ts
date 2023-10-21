import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingDescriptionProps {
  [key: string]: string;
  value: string;
}

export class BuildingDescription extends ValueObject<BuildingDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: BuildingDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<BuildingDescription> {
    if (description.length > 255)
      return Result.fail<BuildingDescription>(
        'Building description must be 255 characters or less'
      );
    return Result.ok<BuildingDescription>(new BuildingDescription({ value: description }));
  }
}
