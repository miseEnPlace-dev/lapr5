import { Mapper } from '../core/infra/Mapper';

import { Role } from '../domain/role/role';
import IRoleDTO from '../dto/IRoleDTO';

import { IRolePersistence } from '@/dataschema/IRolePersistence';
import { RoleDescription } from '@/domain/role/roleDescription';
import { RoleName } from '@/domain/role/roleName';
import { RoleTitle } from '@/domain/role/roleTitle';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RoleMapper extends Mapper<Role> {
  public static toDTO(role: Role): IRoleDTO {
    return {
      name: role.name.value,
      title: role.title.value,
      description: role.description?.value
    };
  }

  public static toDomain(role: IRolePersistence): Role | null {
    const name = RoleName.create(role.name).getValue();
    const title = RoleTitle.create(role.title).getValue();
    const description = role.description
      ? RoleDescription.create(role.description).getValue()
      : undefined;

    const roleOrError = Role.create(
      { name, title, description },
      new UniqueEntityID(role.domainId)
    );

    roleOrError.isFailure && console.log(roleOrError.error);

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(role: Role): IRolePersistence {
    return {
      domainId: role.id.toString(),
      name: role.name.value,
      title: role.title.value,
      description: role.description?.value
    };
  }
}
