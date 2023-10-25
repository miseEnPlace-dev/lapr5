import { Mapper } from '../core/infra/Mapper';

import { Role } from '../domain/role/role';
import IRoleDTO from '../dto/IRoleDTO';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RoleMapper extends Mapper<Role> {
  public static toDTO(role: Role): IRoleDTO {
    return {
      id: role.id.toString(),
      name: role.name
    } as IRoleDTO;
  }

  public static toDomain(role: IRoleDTO): Role | null {
    const roleOrError = Role.create(role, new UniqueEntityID(role.id));

    roleOrError.isFailure ? console.log(roleOrError.error) : '';

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(role: Role) {
    return {
      domainId: role.id.toString(),
      name: role.name
    };
  }
}
