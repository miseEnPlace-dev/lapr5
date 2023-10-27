import { Service } from '@freshgum/typedi';

import { Role } from '../domain/role/role';
import { RoleId } from '../domain/role/roleId';
import { RoleMapper } from '../mappers/RoleMapper';
import IRoleRepo from '../services/IRepos/IRoleRepo';

import { Document, FilterQuery } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import roleSchema from '../persistence/schemas/roleSchema';

@Service([])
export default class RoleRepo implements IRoleRepo {
  constructor() {}

  public async exists(role: Role): Promise<boolean> {
    const idX = role.id instanceof RoleId ? (<RoleId>role.id).toValue() : role.id;

    const query = { domainId: idX };
    const roleDocument = await roleSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument === true;
  }

  public async save(role: Role): Promise<Role> {
    const query = { domainId: role.id.toString() };

    const roleDocument = await roleSchema.findOne(query);

    try {
      if (roleDocument === null) {
        const rawRole = RoleMapper.toPersistence(role);

        const roleCreated = await roleSchema.create(rawRole);

        const roleDomain = RoleMapper.toDomain(roleCreated);
        if (!roleDomain) throw new Error('Role not created');
        return roleDomain;
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roleId: RoleId | string): Promise<Role | null> {
    const query = { domainId: roleId };
    const roleRecord = await roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (roleRecord != null) {
      return RoleMapper.toDomain(roleRecord);
    } else return null;
  }
}
