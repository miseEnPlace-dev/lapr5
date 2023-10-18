import { Inject, Service } from 'typedi';

import { Role } from '../domain/role/role';
import { RoleId } from '../domain/role/roleId';
import { RoleMap } from '../mappers/RoleMap';
import IRoleRepo from '../services/IRepos/IRoleRepo';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class RoleRepo implements IRoleRepo {
  constructor(@Inject('roleSchema') private roleSchema: Model<IRolePersistence & Document>) {}

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
        const rawRole = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        const roleDomain = RoleMap.toDomain(roleCreated);
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
      return RoleMap.toDomain(roleRecord);
    } else return null;
  }
}
