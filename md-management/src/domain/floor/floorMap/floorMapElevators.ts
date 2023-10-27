import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface FloorMapElevatorsProps {
  [key: string]: {
    x: number;
    y: number;
  }[];
  elevators: {
    x: number;
    y: number;
  }[];
}

export class FloorMapElevators extends ValueObject<FloorMapElevatorsProps> {
  get elevators(): { x: number; y: number }[] {
    return this.props.elevators;
  }

  private constructor(props: FloorMapElevatorsProps) {
    super(props);
  }

  public static create(elevators: { x: number; y: number }[]): Result<FloorMapElevators> {
    if (!elevators || elevators.length === 0)
      return Result.fail<FloorMapElevators>('elevators is null or undefined');
    if (
      !elevators.every(
        elevator =>
          Guard.isPositiveNumber(elevator.x, 'x').succeeded &&
          Guard.isPositiveNumber(elevator.y, 'y').succeeded
      )
    )
      return Result.fail<FloorMapElevators>('elevators coordinates cannot be negative');
    return Result.ok<FloorMapElevators>(new FloorMapElevators({ elevators }));
  }
}
