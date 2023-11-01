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
      json: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const roleServiceInstance = container.get<IRoleService>(TYPES.roleService);
    stub(roleServiceInstance, 'createRole').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IRoleDTO>({ id: '123', name: body.name })
        );
      })
    );

    const ctrl = new RoleController(roleServiceInstance);

    await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ id: '123', name: req.body.name }));
  });
});
