import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface FloorCodeProps {
  [key: string]: string;
  value: string;
}
export class FloorCode extends ValueObject<FloorCodeProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: FloorCodeProps) {
    super(props);
  }

  public static create(id: string): Result<FloorCode> {
    if (id.length > 5) return Result.fail<FloorCode>('Floor code must be 5 characters or less');

    if (!/^[a-zA-Z0-9\t\s]+$/.test(id))
      return Result.fail<FloorCode>('Floor code must be alphanumeric');

    return Result.ok<FloorCode>(new FloorCode({ value: id }));
  }
}
