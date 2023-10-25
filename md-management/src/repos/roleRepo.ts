import Container, { Service } from 'typedi';

import { Role } from '../domain/role/role';
import { RoleId } from '../domain/role/roleId';
import { RoleMapper } from '../mappers/RoleMapper';
import IRoleRepo from '../services/IRepos/IRoleRepo';

import config from '@/config.mjs';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class RoleRepo implements IRoleRepo {
  private roleSchema: Model<IRolePersistence & Document>;
  constructor() {
    this.roleSchema = Container.get(config.schemas.role.name);
  }

  public async exists(role: Role): Promise<boolean> {
    const idX = role.id instanceof RoleId ? (<RoleId>role.id).toValue() : role.id;

    const query = { domainId: idX };
    const roleDocument = await this.roleSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument === true;
  }

  public async save(role: Role): Promise<Role> {
    const query = { domainId: role.id.toString() };

    const roleDocument = await this.roleSchema.findOne(query);

    try {
      if (roleDocument === null) {
        const rawRole = RoleMapper.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

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
    const roleRecord = await this.roleSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    if (roleRecord != null) {
      return RoleMapper.toDomain(roleRecord);
    } else return null;
  }
}
