import { Repo } from '../../core/infra/Repo';
import { Role } from '../../domain/role/role';
import { RoleId } from '../../domain/role/roleId';

export default interface IRoleRepo extends Repo<Role> {
  save(role: Role): Promise<Role>;
  findByDomainId(roleId: RoleId | string): Promise<Role | null>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}
