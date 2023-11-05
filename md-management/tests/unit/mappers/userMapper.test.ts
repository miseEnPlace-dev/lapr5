import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { User } from '../../../src/domain/user/user';
import { UserEmail } from '../../../src/domain/user/userEmail';
import { UserPassword } from '../../../src/domain/user/userPassword';
import { PhoneNumber } from '../../../src/domain/user/phoneNumber';
import { Role } from '../../../src/domain/role/role';
import { container } from '../../../src/loaders/inversify';
import { UserMapper } from '../../../src/mappers/UserMapper';
import { RoleName } from '../../../src/domain/role/roleName';
import { RoleTitle } from '../../../src/domain/role/roleTitle';
import { TYPES } from '../../../src/loaders/inversify/types';
import IRoleRepo from '../../../src/services/IRepos/IRoleRepo';

import { stub } from 'sinon';

describe('User Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map a user to a dto', () => {
    const userDto = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: '',
      phoneNumber: '911234567',
      role: 'ADMIN'
    };

    const user = User.create(
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: UserEmail.create('email@email.com').getValue(),
        password: UserPassword.create({
          value: 'Password-1',
          hashed: false
        }).getValue(),
        phoneNumber: PhoneNumber.create('911234567').getValue(),
        role: Role.create({
          name: RoleName.create('ADMIN').getValue(),
          title: RoleTitle.create('ADMIN').getValue()
        }).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = UserMapper.toDTO(user.getValue());

    expect(result).toEqual(userDto);
  });

  it('should map a user to persistence', () => {
    const user = User.create(
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: UserEmail.create('email@email.com').getValue(),
        password: UserPassword.create({
          value: 'Password-1',
          hashed: false
        }).getValue(),
        phoneNumber: PhoneNumber.create('911234567').getValue(),
        role: Role.create({
          name: RoleName.create('ADMIN').getValue(),
          title: RoleTitle.create('ADMIN').getValue()
        }).getValue()
      },
      UniqueEntityID.create('1')
    );

    const result = UserMapper.toPersistence(user.getValue());

    expect(result).toEqual({
      domainId: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: 'Password-1',
      phoneNumber: '911234567',
      role: 'ADMIN'
    });
  });

  it('should map a user from persistence', async () => {
    const role = Role.create({
      name: RoleName.create('ADMIN').getValue(),
      title: RoleTitle.create('ADMIN').getValue()
    }).getValue();

    const user = User.create(
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: UserEmail.create('email@email.com').getValue(),
        password: UserPassword.create({
          value: 'Password-1',
          hashed: true
        }).getValue(),
        phoneNumber: PhoneNumber.create('911234567').getValue(),
        role
      },
      UniqueEntityID.create('1')
    );

    const deviceRepoStub = container.get<IRoleRepo>(TYPES.roleRepo);
    stub(deviceRepoStub, 'findByName').resolves(role);
    container.unbind(TYPES.roleRepo);
    container.bind<IRoleRepo>(TYPES.roleRepo).toConstantValue(deviceRepoStub);

    const result = await UserMapper.toDomain({
      domainId: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: 'Password-1',
      phoneNumber: '911234567',
      role: 'ADMIN'
    });

    expect(result).toEqual(user.getValue());
  });

  it('should throw an error when role is not found', async () => {
    const roleRepoStub = container.get<IRoleRepo>(TYPES.roleRepo);
    stub(roleRepoStub, 'findByName').resolves(null);
    container.unbind(TYPES.roleRepo);
    container.bind<IRoleRepo>(TYPES.roleRepo).toConstantValue(roleRepoStub);

    expect(
      async () =>
        await UserMapper.toDomain({
          domainId: '1',
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@email.com',
          password: 'Password-1',
          phoneNumber: '911234567',
          role: 'ADMIN'
        })
    ).rejects.toThrow('Role not found');
  });
});
