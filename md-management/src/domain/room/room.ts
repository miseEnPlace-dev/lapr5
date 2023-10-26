import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Floor } from '../floor/floor';
import { RoomCategory } from './roomCategory';
import { RoomDescription } from './roomDescription';
import { RoomDimensions } from './roomDimensions';
import { RoomName } from './roomName';

interface RoomProps {
  name: RoomName;
  description?: RoomDescription;
  dimensions: RoomDimensions;
  floor: Floor;
  category: RoomCategory;
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

  get floor(): Floor {
    return this.props.floor;
  }

  get category(): RoomCategory {
    return this.props.category;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.dimensions, argumentName: 'dimensions' },
      { argument: props.floor, argumentName: 'floor' },
      { argument: props.category, argumentName: 'category' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Room>(guardResult.message);

    const room = new Room({ ...props }, id);

    return Result.ok<Room>(room);
  }
}
