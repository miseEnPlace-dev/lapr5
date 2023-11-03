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
    stub(deviceServiceInstance, 'createDevice').resolves(
      Result.ok<IDeviceDTO>({
        code: body.code,
        nickname: body.nickname,
        modelCode: body.modelCode,
        description: body.description,
        serialNumber: body.serialNumber,
        isAvailable: true
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
    stub(deviceServiceInstance, 'createDevice').resolves(
      Result.ok<IDeviceDTO>({
        code: body.code,
        nickname: body.nickname,
        modelCode: body.modelCode,
        description: body.description,
        serialNumber: body.serialNumber,
        isAvailable: true
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
    stub(deviceServiceInstance, 'createDevice').resolves(Result.fail<IDeviceDTO>('error'));

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
    stub(deviceServiceInstance, 'createDevice').resolves(Result.fail<IDeviceDTO>('Error message'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('inihibitDevice: returns status 200 code (ok)', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '123' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'inhibitDevice').resolves(
      Result.ok<IDeviceDTO>({
        code: '123',
        nickname: 'device1',
        modelCode: '1',
        description: 'description',
        serialNumber: '123',
        isAvailable: false
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.inhibitDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('inihibitDevice: returns json with code+nickname+modelCode+description+serialNumber+isAvailable values', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'inhibitDevice').resolves(
      Result.ok<IDeviceDTO>({
        code: '123',
        nickname: 'device1',
        modelCode: '1',
        description: 'description',
        serialNumber: '123',
        isAvailable: false
      })
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.inhibitDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, {
      code: '123',
      nickname: 'device1',
      modelCode: '1',
      description: 'description',
      serialNumber: '123',
      isAvailable: false
    });
  });

  it('inihibitDevice: returns status 400 code (bad request) when error occurs', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '123' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'inhibitDevice').resolves(Result.fail<IDeviceDTO>('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.inhibitDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('inihibitDevice: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'inhibitDevice').resolves(Result.fail<IDeviceDTO>('Error message'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.inhibitDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('inihibitDevice: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '123' };

    const res: Partial<Response> = {};

    const next: Partial<NextFunction> = spy();

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'inhibitDevice').throws(new Error('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.inhibitDevice(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match.instanceOf(Error));
  });

  it('getDevicesRobots without query: returns status 200 code (ok)', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.ok<IDeviceDTO[]>([
        {
          code: '123',
          nickname: 'device1',
          modelCode: '1',
          description: 'description',
          serialNumber: '123',
          isAvailable: false
        }
      ])
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('getDevicesRobots without query: returns json with code+nickname+modelCode+description+serialNumber+isAvailable values', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.ok<IDeviceDTO[]>([
        {
          code: '123',
          nickname: 'device1',
          modelCode: '1',
          description: 'description',
          serialNumber: '123',
          isAvailable: false
        }
      ])
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, [
      {
        code: '123',
        nickname: 'device1',
        modelCode: '1',
        description: 'description',
        serialNumber: '123',
        isAvailable: false
      }
    ]);
  });

  it('getDevicesRobots without query: returns status 400 code (bad request) when error occurs', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'getDevicesRobots').resolves(Result.fail<IDeviceDTO[]>('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getDevicesRobots without query: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.fail<IDeviceDTO[]>('Error message')
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('getDevicesRobots without query: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {};

    const next: Partial<NextFunction> = spy();

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);
    stub(deviceServiceInstance, 'getDevicesRobots').throws(new Error('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match.instanceOf(Error));
  });

  it('getDevicesRobots with query: returns status 200 code (ok)', async () => {
    const req: Partial<Request> = {};
    req.query = { filter: 'task', value: 'surveillance' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);

    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.ok<IDeviceDTO[]>([
        {
          code: '123',
          nickname: 'device1',
          modelCode: '1',
          description: 'description',
          serialNumber: '123',
          isAvailable: false
        }
      ])
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('getDevicesRobots with query: returns json with code+nickname+modelCode+description+serialNumber+isAvailable values', async () => {
    const req: Partial<Request> = {};
    req.query = { filter: 'task', value: 'surveillance' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);

    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.ok<IDeviceDTO[]>([
        {
          code: '123',
          nickname: 'device1',
          modelCode: '1',
          description: 'description',
          serialNumber: '123',
          isAvailable: false
        }
      ])
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, [
      {
        code: '123',
        nickname: 'device1',
        modelCode: '1',
        description: 'description',
        serialNumber: '123',
        isAvailable: false
      }
    ]);
  });

  it('getDevicesRobots with query: returns status 400 code (bad request) when error occurs', async () => {
    const req: Partial<Request> = {};
    req.query = { filter: 'task', value: 'surveillance' };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);

    stub(deviceServiceInstance, 'getDevicesRobots').resolves(Result.fail<IDeviceDTO[]>('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getDevicesRobots with query: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.query = { filter: 'task', value: 'surveillance' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);

    stub(deviceServiceInstance, 'getDevicesRobots').resolves(
      Result.fail<IDeviceDTO[]>('Error message')
    );

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('getDevicesRobots with query: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.query = { filter: 'task', value: 'surveillance' };

    const res: Partial<Response> = {};

    const next: Partial<NextFunction> = spy();

    const deviceServiceInstance = container.get<IDeviceService>(TYPES.deviceService);

    stub(deviceServiceInstance, 'getDevicesRobots').throws(new Error('error'));

    const ctrl = new DeviceController(deviceServiceInstance);

    await ctrl.getDevicesRobots(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match.instanceOf(Error));
  });
});
