import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import container from '@/loaders/inversify';
import { beforeEach, describe, it } from 'vitest';
import RoleController from '../../../src/controllers/roleController';
import { Result } from '../../../src/core/logic/Result';
import IRoleDTO from '../../../src/dto/IRoleDTO';
import IRoleService from '../../../src/services/IServices/IRoleService';
import RoleService from '../../../src/services/roleService';

describe('role controller', () => {
  beforeEach(() => {
    container.restore();
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

    const roleServiceInstance: IRoleService = container.get(RoleService);
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
