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

describe('floor controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return 201 (Created) when creating a new floor', async () => {
    const body = { name: 'floor12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IFloorDTO>({
            code: '123',
            name: body.name,
            maxDimensions: { width: 10, length: 10 }
          })
        );
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createFloor: returns json with code+name+max-dimensions values', async () => {
    const body = { name: 'floor12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IFloorDTO>({
            code: '123',
            name: body.name,
            maxDimensions: { width: 10, length: 10 }
          })
        );
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

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

  it('createFloor: returns 400 when error occurs', async () => {
    const body = { name: 'floor12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').returns(
      new Promise(resolve => {
        resolve(Result.fail<IFloorDTO>('Floor already exists'));
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createFloor: returns json with service message error', async () => {
    const body = { name: 'floor12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').returns(
      new Promise(resolve => {
        resolve(Result.fail<IFloorDTO>('Error message'));
      })
    );

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('createFloor: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};

    const res: Partial<Response> = {};
    const next = spy();

    const floorServiceInstance = container.get<IFloorService>(TYPES.floorService);
    stub(floorServiceInstance, 'createFloor').throws(new Error('Error message'));

    const ctrl = new FloorController(floorServiceInstance);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });
});
