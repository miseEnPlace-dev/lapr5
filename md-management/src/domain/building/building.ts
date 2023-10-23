import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Elevator } from '../elevator/elevator';
import { BuildingCode } from './buildingCode';
import { BuildingDescription } from './buildingDescription';
import { BuildingMaxDimensions } from './buildingMaxDimensions';
import { BuildingName } from './buildingName';

interface BuildingProps {
  code: BuildingCode;
  name?: BuildingName;
  description?: BuildingDescription;
  maxDimensions: BuildingMaxDimensions;
  elevator?: Elevator;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): BuildingCode {
    return this.props.code;
  }

  get name(): BuildingName | undefined {
    return this.props.name;
  }

  get description(): BuildingDescription | undefined {
    return this.props.description;
  }

  get maxDimensions(): BuildingMaxDimensions {
    return this.props.maxDimensions;
  }

  get elevator(): Elevator | undefined {
    return this.props.elevator;
  }

  set elevator(elevator: Elevator) {
    this.props.elevator = elevator;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.maxDimensions, argumentName: 'maxDimensions' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Building>(guardResult.message);

    const building = new Building({ ...props }, id);

    return Result.ok<Building>(building);
  }
}
