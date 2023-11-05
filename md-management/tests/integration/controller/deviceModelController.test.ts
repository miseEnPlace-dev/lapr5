import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import DeviceModelController from '../../../src/controllers/deviceModelController';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IDeviceModelRepo from '../../../src/services/IRepos/IDeviceModelRepo';

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
      capabilities: ['pick_delivery']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves();

    stub(deviceModelRepo, 'findByCode').resolves(null);

    container.rebind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelRepo);

    const deviceModelServiceInstance = container.get<IDeviceModelRepo>(TYPES.deviceModelService);

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createDeviceModel: returns json with deviceModel data', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['pick_delivery']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves();

    stub(deviceModelRepo, 'findByCode').resolves(null);

    container.rebind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelRepo);

    const deviceModelServiceInstance = container.get<IDeviceModelRepo>(TYPES.deviceModelService);

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(body));
  });

  it('createDeviceModel: returns status 400 code (bad request) when deviceModel already exists', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['pick_delivery']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves();

    stub(deviceModelRepo, 'findByCode').resolves({});

    container.rebind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelRepo);

    const deviceModelServiceInstance = container.get<IDeviceModelRepo>(TYPES.deviceModelService);

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createDeviceModel: returns json with error message when deviceModel already exists', async () => {
    const body = {
      code: '1',
      type: 'robot',
      name: 'deviceModel12',
      brand: 'brand',
      capabilities: ['pick_delivery']
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves();

    stub(deviceModelRepo, 'findByCode').resolves({});

    container.rebind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelRepo);

    const deviceModelServiceInstance = container.get<IDeviceModelRepo>(TYPES.deviceModelService);

    const ctrl = new DeviceModelController(deviceModelServiceInstance);

    await ctrl.createDeviceModel(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Device Model already exists' }));
  });
});
