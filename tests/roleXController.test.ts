import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import { Container } from 'typedi';
import RoleController from '../src/controllers/roleController';
import { Result } from '../src/core/logic/Result';
import { Role } from '../src/domain/role';
import IRoleDTO from '../src/dto/IRoleDTO';
import IRoleService from '../src/services/IServices/IRoleService';

import { afterEach, beforeEach, describe, it } from 'vitest';

describe('role controller', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    const roleSchemaInstance = require('../src/persistence/schemas/roleSchema').default;
    Container.set('roleSchema', roleSchemaInstance);

    const roleRepoClass = require('../src/repos/roleRepo').default;
    const roleRepoInstance = Container.get(roleRepoClass);
    Container.set('RoleRepo', roleRepoInstance);

    const roleServiceClass = require('../src/services/roleService').default;
    const roleServiceInstance = Container.get(roleServiceClass);
    Container.set('RoleService', roleServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('roleController unit test using roleService stub', async function() {
    // Arrange
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;
    const res: Partial<Response> = {
      json: sinon.spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = Container.get('RoleService');
    sinon.stub(roleServiceInstance, 'createRole').returns(
      Result.ok<IRoleDTO>({ id: '123', name: req.body.name })
    );

    const ctrl = new RoleController(roleServiceInstance as IRoleService);

    // Act
    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
  });

  it('roleController + roleService integration test using roleRepoistory and Role stubs', async function() {
    // Arrange
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy()
    };
    const next: Partial<NextFunction> = () => {};

    sinon.stub(Role, 'create').returns(Result.ok({ id: '123', name: req.body.name }));

    const roleRepoInstance = Container.get('RoleRepo');
    sinon.stub(roleRepoInstance, 'save').returns(
      new Promise<Role>((resolve, reject) => {
        resolve(Role.create({ id: '123', name: req.body.name }).getValue());
      })
    );

    const roleServiceInstance = Container.get('RoleService');

    const ctrl = new RoleController(roleServiceInstance as IRoleService);

    // Act
    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
  });

  it('roleController + roleService integration test using spy on roleService', async function() {
    // Arrange
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleRepoInstance = Container.get('RoleRepo');
    sinon.stub(roleRepoInstance, 'save').returns(
      new Promise<Role>((resolve, reject) => {
        resolve(Role.create({ id: '123', name: req.body.name }).getValue());
      })
    );

    const roleServiceInstance = Container.get('RoleService');
    const roleServiceSpy = sinon.spy(roleServiceInstance, 'createRole');

    const ctrl = new RoleController(roleServiceInstance as IRoleService);

    // Act
    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
    sinon.assert.calledOnce(roleServiceSpy);
    //sinon.assert.calledTwice(roleServiceSpy);
    sinon.assert.calledWith(roleServiceSpy, sinon.match({ name: req.body.name }));
  });

  it('roleController unit test using roleService mock', async function() {
    // Arrange
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = Container.get('RoleService');
    const roleServiceMock = sinon.mock(roleServiceInstance, 'createRole');
    roleServiceMock
      .expects('createRole')
      .once()
      .withArgs(sinon.match({ name: req.body.name }))
      .returns(
        Result.ok<IRoleDTO>({ id: '123', name: req.body.name })
      );

    const ctrl = new RoleController(roleServiceInstance as IRoleService);

    // Act
    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    roleServiceMock.verify();
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
  });
});
