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
    return Result.ok<BuildingDescription>(new BuildingDescription({ value: description }));
  }
}
