import { Role } from '../domain/role/role';
import { RoleMapper } from '../mappers/RoleMapper';
import IRoleRepo from '../services/IRepos/IRoleRepo';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { injectable } from 'inversify';
import { Document, FilterQuery } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import roleSchema from '../persistence/schemas/roleSchema';

@injectable()
export default class RoleRepo implements IRoleRepo {
  constructor() {}

  public async exists(role: Role): Promise<boolean> {
    const idX = role.id instanceof UniqueEntityID ? (<UniqueEntityID>role.id).toValue() : role.id;

    const query = { domainId: idX };
    const roleDocument = await roleSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument === true;
  }

  public async count(): Promise<number> {
    return await roleSchema.count();
  }

  public async save(role: Role): Promise<Role> {
    const query: FilterQuery<IRolePersistence & Document> = { domainId: role.id.toString() };

    const roleDocument = await roleSchema.findOne(query);

    try {
      if (roleDocument === null) {
        const rawRole = RoleMapper.toPersistence(role);

        const roleCreated = await roleSchema.create(rawRole);

        const roleDomain = RoleMapper.toDomain(roleCreated);
        if (!roleDomain) throw new Error('Role not created');

        return roleDomain;
      }

      roleDocument.name = role.name.value;
      roleDocument.title = role.title.value;
      roleDocument.description = role.description?.value;
      await roleDocument.save();

      return role;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roleId: UniqueEntityID | string): Promise<Role | null> {
    const query: FilterQuery<IRolePersistence & Document> = { domainId: roleId };
    const roleRecord = await roleSchema.findOne(query);

    if (roleRecord !== null) return RoleMapper.toDomain(roleRecord);

    return null;
  }

  public async findByName(name: string): Promise<Role | null> {
    const query: FilterQuery<IRolePersistence & Document> = { name };
    const roleRecord = await roleSchema.findOne(query);

    if (roleRecord !== null) return RoleMapper.toDomain(roleRecord);

    return null;
  }

  public async findAll(): Promise<Role[]> {
    const roleRecords = await roleSchema.find();

    const roles: Role[] = [];
    for (const rec of roleRecords) {
      const role = await RoleMapper.toDomain(rec);
      if (role) roles.push(role);
    }

    return roles;
  }
}
