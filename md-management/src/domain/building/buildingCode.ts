import { Result } from '@/core/logic/Result';
import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class BuildingCode extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: string): Result<BuildingCode> {
    if (id.length > 5)
      return Result.fail<BuildingCode>('Building code must be 5 characters or less');
    if (!/^[a-zA-Z0-9 ]+$/.test(id))
      return Result.fail<BuildingCode>('Building code must be alphanumeric');

    return Result.ok<BuildingCode>(new BuildingCode(UniqueEntityID.create(id)));
  }
}
