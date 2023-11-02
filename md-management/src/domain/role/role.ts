import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { RoleDescription } from './roleDescription';
import { RoleName } from './roleName';
import { RoleTitle } from './roleTitle';

interface RoleProps {
  name: RoleName;
  title: RoleTitle;
  description?: RoleDescription;
}

export class Role extends AggregateRoot<RoleProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): RoleName {
    return this.props.name;
  }

  get title(): RoleTitle {
    return this.props.title;
  }

  get description(): RoleDescription | undefined {
    return this.props.description;
  }

  set name(name: RoleName) {
    this.props.name = name;
  }

  private constructor(props: RoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoleProps, id?: UniqueEntityID): Result<Role> {
    const role = new Role({ ...props }, id);

    return Result.ok<Role>(role);
  }
}
