import { Result } from '@/core/logic/Result';
import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class FloorCode extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: string): Result<FloorCode> {
    if (id.length > 5) return Result.fail<FloorCode>('Building code must be 5 characters or less');

    return Result.ok<FloorCode>(new FloorCode(new UniqueEntityID(id)));
  }
}
