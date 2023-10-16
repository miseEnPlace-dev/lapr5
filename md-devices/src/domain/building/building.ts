import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { BuildingCode } from './buildingCode';
import { BuildingDescription } from './buildingDescription';
import { BuildingMaxDimensions } from './buildingMaxDimensions';
import { BuildingName } from './buildingName';

interface BuildingProps {
  code: string;
  name?: string;
  description?: string;
  maxDimensions: {
    width: number;
    height: number;
  };
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): BuildingCode {
    return BuildingCode.caller(this.props.code);
  }

  get name(): BuildingName {
    return BuildingName.caller(this.props.name);
  }

  get description(): BuildingDescription {
    return BuildingDescription.caller(this.props.description);
  }

  get maxDimensions(): BuildingMaxDimensions {
    return BuildingMaxDimensions.caller(this.props.maxDimensions);
  }

  get buildingCode(): BuildingCode {
    return BuildingCode.caller(this.code);
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.maxDimensions, argumentName: 'maxDimensions' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message);
    } else {
      const building = new Building(
        {
          ...props
        },
        id
      );

      return Result.ok<Building>(building);
    }
  }
}
