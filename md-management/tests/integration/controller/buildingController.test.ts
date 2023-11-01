import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import BuildingController from '../../../src/controllers/buildingController';
import { Result } from '../../../src/core/logic/Result';
import { IBuildingDTO } from '../../../src/dto/IBuildingDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IBuildingService from '../../../src/services/IServices/IBuildingService';

describe('building controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createBuilding: returns status 201 code (created)', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'createBuilding').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IBuildingDTO>({
            code: '123',
            name: body.name,
            maxDimensions: { width: 10, length: 10 }
          })
        );
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createBuilding: returns json with code+name+max-dimensions values', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'createBuilding').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IBuildingDTO>({
            code: '123',
            name: body.name,
            maxDimensions: { width: 10, length: 10 }
          })
        );
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: '123',
        name: body.name,
        maxDimensions: { width: 10, length: 10 }
      })
    );
  });

  it('createBuilding: returns 400 if code is already used', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'createBuilding').returns(
      new Promise(resolve => {
        resolve(Result.fail<IBuildingDTO>('Building already exists'));
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });
});
