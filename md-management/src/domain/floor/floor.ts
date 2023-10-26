import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { BuildingCode } from '../building/buildingCode';
import { FloorCode } from './floorCode';
import { FloorDescription } from './floorDescription';
import { FloorDimensions } from './floorDimensions';
import { FloorMap } from './floorMap/floorMap';

interface FloorProps {
  code: FloorCode;
  buildingCode: BuildingCode;
  description?: FloorDescription;
  dimensions: FloorDimensions;
  map?: FloorMap;
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

  get buildingCode(): BuildingCode {
    return this.props.buildingCode;
  }

  set buildingCode(value: BuildingCode) {
    this.props.buildingCode = value;
  }

  get map(): FloorMap | undefined {
    return this.props.map;
  }

  set map(map: FloorMap) {
    if (map.size.depth != this.dimensions.height || map.size.width != this.dimensions.width)
      throw new Error('Map size does not match floor dimensions');
    this.props.map = map;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.buildingCode, argumentName: 'buildingCode' },
      { argument: props.dimensions, argumentName: 'dimensions' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Floor>(guardResult.message);

    const floor = new Floor({ ...props }, id);

    return Result.ok<Floor>(floor);
  }
}
