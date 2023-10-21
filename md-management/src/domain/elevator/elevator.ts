import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { ElevatorBranding } from './elevatorBranding';
import { ElevatorDescription } from './elevatorDescription';
import { ElevatorIdentifier } from './elevatorIdentifier';
import { ElevatorSerialNumber } from './elevatorSerialNumber';

interface ElevatorProps {
  id: ElevatorIdentifier;
  branding?: ElevatorBranding;
  serialNumber?: ElevatorSerialNumber;
  description?: ElevatorDescription;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): ElevatorIdentifier {
    return this.props.id;
  }

  get brand(): string | undefined {
    return this.props.branding?.brand;
  }

  get model(): string | undefined {
    return this.props.branding?.model;
  }

  get description(): ElevatorDescription | undefined {
    return this.props.description;
  }

  private constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    const guardResult = Guard.againstNullOrUndefined(props.id, 'id');

    if (!guardResult.succeeded) return Result.fail<Elevator>(guardResult.message);

    const elevator = new Elevator({ ...props }, id);

    return Result.ok<Elevator>(elevator);
  }
}
