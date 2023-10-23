import { Result } from '@/core/logic/Result';
import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class ElevatorSerialNumber extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: string): Result<ElevatorSerialNumber> {
    if (id.length > 50)
      return Result.fail<ElevatorSerialNumber>('Elevator identifier must be 5 characters or less');

    return Result.ok<ElevatorSerialNumber>(new ElevatorSerialNumber(UniqueEntityID.create(id)));
  }
}
