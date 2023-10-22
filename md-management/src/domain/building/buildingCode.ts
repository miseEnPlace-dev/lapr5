import { ValueObject } from '@/core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingCodeProps {
  [key: string]: string;
  value: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
  get code(): string {
    return this.props.value;
  }

  private constructor(props: BuildingCodeProps) {
    super(props);
  }

  public static create(id: string): Result<BuildingCode> {
    if (id.length > 5)
      return Result.fail<BuildingCode>('Building code must be 5 characters or less');
    if (!/^[a-zA-Z0-9 ]+$/.test(id))
      return Result.fail<BuildingCode>('Building code must be alphanumeric');

    return Result.ok<BuildingCode>(new BuildingCode({ value: id }));
  }
}
