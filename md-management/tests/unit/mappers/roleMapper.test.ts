import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Role } from '../../../src/domain/role/role';
import { RoleName } from '../../../src/domain/role/roleName';
import { RoleTitle } from '../../../src/domain/role/roleTitle';
import { container } from '../../../src/loaders/inversify';
import { RoleMapper } from '../../../src/mappers/RoleMapper';

describe('Role Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a role to a dto', () => {
    const roleDto = {
      name: 'name',
      title: 'title'
    };

    const role = Role.create({
      name: RoleName.create('name').getValue(),
      title: RoleTitle.create('title').getValue()
    });

    const result = RoleMapper.toDTO(role.getValue());

    expect(result).toEqual(roleDto);
  });

  it('should map a role to persistence', () => {
    const role = Role.create(
      {
        name: RoleName.create('name').getValue(),
        title: RoleTitle.create('title').getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = RoleMapper.toPersistence(role.getValue());

    expect(result).toEqual({
      domainId: '1',
      name: 'name',
      title: 'title'
    });
  });

  it('should map a role from persistence', async () => {
    const role = Role.create(
      {
        name: RoleName.create('name').getValue(),
        title: RoleTitle.create('title').getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = await RoleMapper.toDomain({
      domainId: '1',
      name: 'name',
      title: 'title'
    });

    expect(result).toEqual(role.getValue());
  });
});
