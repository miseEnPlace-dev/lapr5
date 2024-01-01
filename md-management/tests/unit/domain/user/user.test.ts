import { describe, expect, it } from 'vitest';

import { Role } from '../../../../src/domain/role/role';
import { RoleName } from '../../../../src/domain/role/roleName';
import { RoleTitle } from '../../../../src/domain/role/roleTitle';
import { PhoneNumber } from '../../../../src/domain/user/phoneNumber';
import { User } from '../../../../src/domain/user/user';
import { UserEmail } from '../../../../src/domain/user/userEmail';
import { UserPassword } from '../../../../src/domain/user/userPassword';

describe('User', () => {
  it('should fail if some of the user properties are null', () => {
    const result = User.create({
      email: (null as unknown) as UserEmail,
      password: UserPassword.create({
        value: 'Password1'
      }).getValue(),
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: PhoneNumber.create('912345678').getValue(),
      role: Role.create({
        name: RoleName.create('role').getValue(),
        title: RoleTitle.create('title').getValue()
      }).getValue()
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Email is null or undefined');
  });

  it('should fail if some of the user properties are undefined', () => {
    const result = User.create({
      email: (undefined as unknown) as UserEmail,
      password: UserPassword.create({
        value: 'Password1'
      }).getValue(),
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: PhoneNumber.create('912345678').getValue(),
      role: Role.create({
        name: RoleName.create('role').getValue(),
        title: RoleTitle.create('title').getValue()
      }).getValue()
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Email is null or undefined');
  });

  it('should create a new user', () => {
    const result = User.create({
      email: UserEmail.create('email@isep.ipp.pt').getValue(),
      password: UserPassword.create({
        value: 'Password1'
      }).getValue(),
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: PhoneNumber.create('912345678').getValue(),
      role: Role.create({
        name: RoleName.create('role').getValue(),
        title: RoleTitle.create('title').getValue()
      }).getValue()
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().firstName).toBe('John');
    expect(result.getValue().lastName).toBe('Doe');
    expect(result.getValue().phoneNumber.value).toBe('912345678');
    expect(result.getValue().role.name.value).toBe('role');
  });
});
