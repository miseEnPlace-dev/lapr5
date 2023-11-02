import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import DeviceModelController from '../../../src/controllers/deviceModelController';
import { Result } from '../../../src/core/logic/Result';
import { IDeviceModelDTO } from '../../../src/dto/IDeviceModelDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IDeviceModelService from '../../../src/services/IServices/IDeviceModelService';

describe('deviceModel controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createDeviceModel: returns status 201 code (created)', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['capability1']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const deviceModelServiceInstance = container.get<IDeviceModelService>(TYPES.deviceModelService);
    stub(deviceModelServiceInstance, 'createDeviceModel').resolves(
      Result.ok<IDeviceModelDTO>({
        code: '1',
        type: 'robot',
        name: 'deviceModel12',
        brand: 'brand',
        capabilities: ['capability1']
      })
    );

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createDeviceModel: returns json with code+name+max-dimensions values', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['capability1']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceModelServiceInstance = container.get<IDeviceModelService>(TYPES.deviceModelService);
    stub(deviceModelServiceInstance, 'createDeviceModel').resolves(
      Result.ok<IDeviceModelDTO>({
        code: '1',
        type: 'robot',
        name: 'deviceModel12',
        brand: 'brand',
        capabilities: ['capability1']
      })
    );

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: '1',
        type: 'robot',
        name: 'deviceModel12',
        brand: 'brand',
        capabilities: ['capability1']
      })
    );
  });

  it('createDeviceModel: returns 400 if service fails', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['capability1']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const deviceModelServiceInstance = container.get<IDeviceModelService>(TYPES.deviceModelService);
    stub(deviceModelServiceInstance, 'createDeviceModel').resolves(
      Result.fail<IDeviceModelDTO>('DeviceModel already exists')
    );

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createDeviceModel: returns json with service message error', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['capability1']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceModelServiceInstance = container.get<IDeviceModelService>(TYPES.deviceModelService);
    stub(deviceModelServiceInstance, 'createDeviceModel').resolves(
      Result.fail<IDeviceModelDTO>('Error message')
    );

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('createDeviceModel: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};

    const res: Partial<Response> = {};
    const next = spy();

    const deviceModelServiceInstance = container.get<IDeviceModelService>(TYPES.deviceModelService);
    stub(deviceModelServiceInstance, 'createDeviceModel').throws(new Error('Error message'));

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });
});
