import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface ElevatorSerialNumberProps {
  [key: string]: string;
  value: string;
}

export class ElevatorSerialNumber extends ValueObject<ElevatorSerialNumberProps> {
  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<ElevatorSerialNumber> {
    if (value.length > 50)
      return Result.fail<ElevatorSerialNumber>(
        'Elevator serial number cannot exceed 50 characters'
      );

    return Result.ok<ElevatorSerialNumber>(new ElevatorSerialNumber({ value }));
  }
}
