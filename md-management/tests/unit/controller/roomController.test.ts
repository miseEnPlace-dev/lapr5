import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';

import RoomController from '../../../src/controllers/roomController';
import { Result } from '../../../src/core/logic/Result';
import { IRoomDTO } from '../../../src/dto/IRoomDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IRoomService from '../../../src/services/IServices/IRoomService';

describe('room controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createRoom: returns status 201 code (created)', async () => {
    const body = {
      name: 'room12',
      floorCode: '1',
      category: 'OFFICE',
      dimensions: { width: 10, length: 10 }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const roomServiceInstance = container.get<IRoomService>(TYPES.roomService);
    stub(roomServiceInstance, 'createRoom').resolves(
      Result.ok<IRoomDTO>({
        name: body.name,
        floorCode: body.floorCode,
        category: body.category,
        dimensions: body.dimensions
      })
    );

    const ctrl = new RoomController(roomServiceInstance);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createDevice: returns json with code+nickname+modelCode+description+serialNumber+isAvailable values', async () => {
    const body = {
      name: 'room12',
      floorCode: '1',
      category: 'OFFICE',
      dimensions: { width: 10, length: 10 }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const roomServiceInstance = container.get<IRoomService>(TYPES.roomService);
    stub(roomServiceInstance, 'createRoom').resolves(
      Result.ok<IRoomDTO>({
        name: body.name,
        floorCode: body.floorCode,
        category: body.category,
        dimensions: body.dimensions
      })
    );

    const ctrl = new RoomController(roomServiceInstance);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, {
      name: body.name,
      floorCode: body.floorCode,
      category: body.category,
      dimensions: body.dimensions
    });
  });

  it('createRoom: returns status 400 code (bad request) when error occurs', async () => {
    const body = {
      name: 'room12',
      floorCode: '1',
      category: 'OFFICE',
      dimensions: { width: 10, length: 10 }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const roomServiceInstance = container.get<IRoomService>(TYPES.roomService);
    stub(roomServiceInstance, 'createRoom').resolves(Result.fail<IRoomDTO>('error'));

    const ctrl = new RoomController(roomServiceInstance);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createRoom: returns json with service message error', async () => {
    const body = {
      name: 'room12',
      floorCode: '1',
      category: 'OFFICE',
      dimensions: { width: 10, length: 10 }
    };

    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const roomServiceInstance = container.get<IRoomService>(TYPES.roomService);
    stub(roomServiceInstance, 'createRoom').resolves(Result.fail<IRoomDTO>('Error message'));

    const ctrl = new RoomController(roomServiceInstance);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });
});
