import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import RoleController from '../../../src/controllers/roleController';
import { Result } from '../../../src/core/logic/Result';
import IRoleDTO from '../../../src/dto/IRoleDTO';
import { container } from '../../../src/loaders/inversify/';
import { TYPES } from '../../../src/loaders/inversify/types';
import IRoleService from '../../../src/services/IServices/IRoleService';

describe('role controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createRole: returns json with id+name values', async () => {
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IRoleDTO>({ title: '123', name: body.name })
        );
      })
    );

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ title: '123', name: req.body.name }));
  });

  it('createRole: returns json with id+name values', async () => {
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IRoleDTO>({ title: '123', name: body.name })
        );
      })
    );

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createRole: returns status 400 when error occurs', async () => {
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').returns(
      new Promise(resolve => {
        resolve(Result.fail<IRoleDTO>('error'));
      })
    );

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createRole: returns json with error message when error occurs', async () => {
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').returns(
      new Promise(resolve => {
        resolve(Result.fail<IRoleDTO>('error'));
      })
    );

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'error' }));
  });

  it('createRole: calls next when service throws error', async () => {
    const body = { name: 'role12' };
    const req: Partial<Request> = {};
    req.body = body;

    const res = {};
    const next: Partial<NextFunction> = spy();

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').throws(new Error('error'));

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'error' }));
  });
});
