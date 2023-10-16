import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class UserId extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
}
