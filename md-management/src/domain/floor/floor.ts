import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Building } from '../building/building';
import { FloorCode } from './floorCode';
import { FloorDescription } from './floorDescription';
import { FloorDimensions } from './floorDimensions';

interface FloorProps {
  code: FloorCode;
  building: Building;
  description?: FloorDescription;
  dimensions: FloorDimensions;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): FloorCode {
    return this.props.code;
  }

  get description(): FloorDescription | undefined {
    return this.props.description;
  }

  set description(value: FloorDescription | undefined) {
    this.props.description = value;
  }

  get dimensions(): FloorDimensions {
    return this.props.dimensions;
  }

  set dimensions(value: FloorDimensions) {
    this.props.dimensions = value;
  }

  get building(): Building {
    return this.props.building;
  }

  set building(value: Building) {
    this.props.building = value;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.building, argumentName: 'building' },
      { argument: props.dimensions, argumentName: 'dimensions' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Floor>(guardResult.message);

    const floor = new Floor({ ...props }, id);

    return Result.ok<Floor>(floor);
  }
}
