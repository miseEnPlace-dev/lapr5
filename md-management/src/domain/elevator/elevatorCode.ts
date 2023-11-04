import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface ElevatorCodeProps {
  [key: string]: number;
  code: number;
}

export class ElevatorCode extends ValueObject<ElevatorCodeProps> {
  get value(): number {
    return this.props.code;
  }

  public static create(code: number): Result<ElevatorCode> {
    const guardResult = Guard.isPositiveNumber(code, 'Elevator code');
    if (!guardResult.succeeded) return Result.fail<ElevatorCode>(guardResult.message);

    return Result.ok<ElevatorCode>(new ElevatorCode({ code }));
  }
}
