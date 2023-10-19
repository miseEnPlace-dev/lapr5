import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingNameProps {
  [key: string]: string;
  value: string;
}

export class BuildingName extends ValueObject<BuildingNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: BuildingNameProps) {
    super(props);
  }

  public static create(name: string): Result<BuildingName> {
    if (name.length > 50) throw new Error('Building name must be 50 characters or less.');

    return Result.ok<BuildingName>(new BuildingName({ value: name }));
  }
}
