import { Entity } from '@/core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Floor } from '../floor/floor';
import { ElevatorBranding } from './elevatorBranding';
import { ElevatorCode } from './elevatorCode';
import { ElevatorDescription } from './elevatorDescription';
import { ElevatorSerialNumber } from './elevatorSerialNumber';

interface ElevatorProps {
  code: ElevatorCode;
  branding?: ElevatorBranding;
  serialNumber?: ElevatorSerialNumber;
  description?: ElevatorDescription;
  floors: Floor[];
}

export class Elevator extends Entity<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): ElevatorCode {
    return this.props.code;
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

  get serialNumber(): ElevatorSerialNumber | undefined {
    return this.props.serialNumber;
  }

  get floors(): Floor[] {
    return this.props.floors;
  }

  private constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    const guardResult = Guard.againstNullOrUndefined(props.code, 'code');

    if (!guardResult.succeeded) return Result.fail<Elevator>(guardResult.message);

    const elevator = new Elevator({ ...props }, id);

    return Result.ok<Elevator>(elevator);
  }
}
