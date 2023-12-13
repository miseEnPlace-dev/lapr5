import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { FloorCode } from '../floor/floorCode';
import { RoomCategory } from './roomCategory';
import { RoomDescription } from './roomDescription';
import { RoomDimensions } from './roomDimensions';
import { RoomDoor } from './roomDoor';
import { RoomName } from './roomName';

interface RoomProps {
  name: RoomName;
  description?: RoomDescription;
  dimensions: RoomDimensions;
  floorCode: FloorCode;
  category: RoomCategory;
  roomDoor: RoomDoor;
}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): RoomName {
    return this.props.name;
  }

  get description(): RoomDescription | undefined {
    return this.props.description;
  }

  get dimensions(): RoomDimensions {
    return this.props.dimensions;
  }

  get floorCode(): FloorCode {
    return this.props.floorCode;
  }

  get category(): RoomCategory {
    return this.props.category;
  }

  get roomDoor(): RoomDoor {
    return this.props.roomDoor;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.dimensions, argumentName: 'dimensions' },
      { argument: props.floorCode, argumentName: 'floorCode' },
      { argument: props.category, argumentName: 'category' },
      { argument: props.roomDoor, argumentName: 'roomDoor' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Room>(guardResult.message);

    const room = new Room({ ...props }, id);

    return Result.ok<Room>(room);
  }
}
