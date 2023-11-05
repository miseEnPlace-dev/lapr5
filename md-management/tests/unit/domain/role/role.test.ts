import { describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Role } from '../../../../src/domain/role/role';
import { RoleDescription } from '../../../../src/domain/role/roleDescription';
import { RoleName } from '../../../../src/domain/role/roleName';
import { RoleTitle } from '../../../../src/domain/role/roleTitle';

describe('Role', () => {
  it('should not create a role description with empty description', () => {
    const description = '';
    const role = RoleDescription.create(description);

    expect(role.isFailure).toBe(true);
    expect(role.error).toBe('Role description cannot be empty');
  });

  it('should create a uuid when creating a role', () => {
    const description = 'Role description';
    const role = Role.create({
      description: RoleDescription.create(description).getValue(),
      name: RoleName.create('Role name').getValue(),
      title: RoleTitle.create('Role title').getValue()
    });

    expect(role.isSuccess).toBe(true);
    expect(role.getValue().id).toBeDefined();
  });

  it('should create a role with an id', () => {
    const description = 'Role description';
    const role = Role.create(
      {
        description: RoleDescription.create(description).getValue(),
        name: RoleName.create('Role name').getValue(),
        title: RoleTitle.create('Role title').getValue()
      },
      UniqueEntityID.create('123')
    );

    expect(role.isSuccess).toBe(true);
    expect(role.getValue().id.toValue()).toBe('123');
  });
});
