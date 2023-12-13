import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RoomDoorProps {
  [key: string]: number;
  x: number;
  y: number;
}

export class RoomDoor extends ValueObject<RoomDoorProps> {
  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  private constructor(props: RoomDoorProps) {
    super(props);
  }

  public static create(x: number, y: number): Result<RoomDoor> {
    const roomDoorXOrError = Guard.againstNullOrUndefined(x, 'roomDoorX');
    const roomDoorYOrError = Guard.againstNullOrUndefined(y, 'roomDoorY');

    if (!roomDoorXOrError.succeeded) {
      return Result.fail<RoomDoor>(roomDoorXOrError.message);
    }

    if (!roomDoorYOrError.succeeded) {
      return Result.fail<RoomDoor>(roomDoorYOrError.message);
    }

    return Result.ok<RoomDoor>(new RoomDoor({ x, y }));
  }
}
