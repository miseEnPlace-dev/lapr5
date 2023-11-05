import { describe, expect, it } from 'vitest';

import { RoleDescription } from '../../../../src/domain/role/roleDescription';

describe('Role Description', () => {
  it('should not create a role description with empty description', () => {
    const description = '';
    const role = RoleDescription.create(description);

    expect(role.isFailure).toBe(true);
    expect(role.error).toBe('Role description cannot be empty');
  });

  it('should not create a role description with null', () => {
    const description = null;
    const role = RoleDescription.create((description as unknown) as string);

    expect(role.isFailure).toBe(true);
    expect(role.error).toBe('Role Description is null or undefined');
  });

  it('should not create a role description with undefined', () => {
    const description = undefined;
    const role = RoleDescription.create((description as unknown) as string);

    expect(role.isFailure).toBe(true);
    expect(role.error).toBe('Role Description is null or undefined');
  });

  it('should create a role description', () => {
    const description = 'Role description';
    const role = RoleDescription.create(description);

    expect(role.isSuccess).toBe(true);
    expect(role.getValue().value).toBe(description);
  });
});
