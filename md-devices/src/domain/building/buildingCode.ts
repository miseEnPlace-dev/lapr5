import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class BuildingCode extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: string): BuildingCode {
    if (id.length < 5) throw new Error('Building code must be at least 5 characters long');
    if (!/^[a-zA-Z0-9 ]+$/.test(id))
      throw new Error('Building code must contain only letters, numbers and spaces');

    return new BuildingCode(UniqueEntityID.caller(id));
  }
}
