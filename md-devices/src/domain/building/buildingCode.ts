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
    return new BuildingCode(UniqueEntityID.caller(id));
  }
}
