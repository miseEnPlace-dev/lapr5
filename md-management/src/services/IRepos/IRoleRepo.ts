import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '../../core/infra/Repo';
import { Role } from '../../domain/role/role';

export default interface IRoleRepo extends Repo<Role> {
  save(role: Role): Promise<Role>;
  findByDomainId(roleId: UniqueEntityID | string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  count(): Promise<number>;
}
