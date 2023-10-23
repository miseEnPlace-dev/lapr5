import { Result } from '@/core/logic/Result';
import { ValueObject } from '@/core/domain/ValueObject';

interface FloorCodeProps {
  [key: string]: string;
  value: string;
}
export class FloorCode extends ValueObject<FloorCodeProps> {
  get code(): string {
    return this.props.value;
  }

  private constructor(props: FloorCodeProps) {
    super(props);
  }

  public static create(id: string): Result<FloorCode> {
    if (id.length > 5) return Result.fail<FloorCode>('Floor code must be 5 characters or less');

    if (!/^[0-9]+$/.test(id)) return Result.fail<FloorCode>('Floor code must be a number');

    return Result.ok<FloorCode>(new FloorCode({ value: id }));
  }
}
