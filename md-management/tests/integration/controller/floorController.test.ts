import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';

import FloorController from '../../../src/controllers/floorController';
import { Result } from '../../../src/core/logic/Result';
import { IFloorDTO } from '../../../src/dto/IFloorDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IFloorService from '../../../src/services/IServices/IFloorService';

describe('floor Controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createFloor: returns status 201 code (created)', async () => {
    const body = {
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 100,
        length: 100
      }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { buildingCode: body.buildingCode };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').resolves(
      Result.ok<IFloorDTO>({
        code: body.code,
        buildingCode: body.buildingCode,
        dimensions: body.dimensions
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createFloor: returns json with code+buildingCode+dimensions values', async () => {
    const body = {
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 100,
        length: 100
      }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { buildingCode: body.buildingCode };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').resolves(
      Result.ok<IFloorDTO>({
        code: body.code,
        buildingCode: body.buildingCode,
        dimensions: body.dimensions
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(body));
  });

  it('createFloor: returns 400 when error occurs', async () => {
    const body = {
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 100,
        length: 100
      }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { buildingCode: body.buildingCode };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').resolves(Result.fail<IFloorDTO>('error'));

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createFloor: returns json with service message error', async () => {
    const body = {
      code: '1',
      buildingCode: '1',
      dimensions: {
        width: 100,
        length: 100
      }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { buildingCode: body.buildingCode };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').resolves(Result.fail<IFloorDTO>('error'));

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'error' }));
  });

  it('createFloor: calls next with error when exception occurs', async () => {
    const req: Partial<Request> = {};
    req.params = { buildingCode: '1' };

    const res: Partial<Response> = {};
    const next = spy();

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').throws(new Error('error'));

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'error' }));
  });
});
