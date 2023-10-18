import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
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
    const guardResult = Guard.againstNullOrUndefined(name, 'name');
    if (!guardResult.succeeded) return Result.fail<BuildingName>(guardResult.message);

    return Result.ok<BuildingName>(new BuildingName({ value: name }));
  }
}
