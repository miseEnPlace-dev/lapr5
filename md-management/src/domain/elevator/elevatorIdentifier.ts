import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';
import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class ElevatorIdentifier extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: number): Result<ElevatorIdentifier> {
    const guardResult = Guard.isPositiveNumber(id, 'id');
    if (!guardResult.succeeded) return Result.fail<ElevatorIdentifier>(guardResult.message);

    return Result.ok<ElevatorIdentifier>(new ElevatorIdentifier(UniqueEntityID.create(id)));
  }
}
