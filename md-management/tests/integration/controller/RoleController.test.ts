import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import RoleController from '../../../src/controllers/roleController';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IRoleRepo from '../../../src/services/IRepos/IRoleRepo';
import IRoleService from '../../../src/services/IServices/IRoleService';

describe('role controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createRole: returns status 201 code (created)', async () => {
    const body = { name: 'name', title: 'title' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleRepo = container.get<IRoleRepo>(TYPES.roleRepo);
    stub(roleRepo, 'save').resolves();

    container.rebind<IRoleRepo>(TYPES.roleRepo).toConstantValue(roleRepo);

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createRole: returns json with role data', async () => {
    const body = { name: 'name', title: 'title' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const roleRepo = container.get<IRoleRepo>(TYPES.roleRepo);
    stub(roleRepo, 'save').resolves();

    container.rebind<IRoleRepo>(TYPES.roleRepo).toConstantValue(roleRepo);

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(body));
  });
});
