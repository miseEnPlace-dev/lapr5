import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';

import DeviceController from '../../../src/controllers/deviceController';
import { Result } from '../../../src/core/logic/Result';
import { IDeviceDTO } from '../../../src/dto/IDeviceDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IDeviceService from '../../../src/services/IServices/IDeviceService';

describe('device controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createDevice: returns status 201 code (created)', async () => {
    const body = {
      code: '123',
      nickname: 'device1',
      modelCode: '1',
      description: 'description',
      serialNumber: '123'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'createDevice').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IDeviceDTO>({
            code: body.code,
            nickname: body.nickname,
            modelCode: body.modelCode,
            description: body.description,
            serialNumber: body.serialNumber,
            isAvailable: true
          })
        );
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createDevice: returns json with code+nickname+modelCode+description+serialNumber+isAvailable values', async () => {
    const body = {
      code: '123',
      nickname: 'device1',
      modelCode: '1',
      description: 'description',
      serialNumber: '123'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'createDevice').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IDeviceDTO>({
            code: body.code,
            nickname: body.nickname,
            modelCode: body.modelCode,
            description: body.description,
            serialNumber: body.serialNumber,
            isAvailable: true
          })
        );
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, {
      code: body.code,
      nickname: body.nickname,
      modelCode: body.modelCode,
      description: body.description,
      serialNumber: body.serialNumber,
      isAvailable: true
    });
  });

  it('createDevice: returns status 400 code (bad request) when error occurs', async () => {
    const body = {
      code: '123',
      nickname: 'device1',
      modelCode: '1',
      description: 'description',
      serialNumber: '123'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'createDevice').returns(
      new Promise(resolve => {
        resolve(Result.fail<IDeviceDTO>('error'));
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createDevice: returns json with service message error', async () => {
    const body = {
      code: '123',
      nickname: 'device1',
      modelCode: '1',
      description: 'description',
      serialNumber: '123'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'createDevice').returns(
      new Promise(resolve => {
        resolve(Result.fail<IDeviceDTO>('Error message'));
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });
});
