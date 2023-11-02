import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import ElevatorController from '../../../src/controllers/elevatorController';
import { Result } from '../../../src/core/logic/Result';
import { IElevatorDTO } from '../../../src/dto/IElevatorDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IElevatorService from '../../../src/services/IServices/IElevatorService';

describe('elevator controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createElevator: returns status 201 code (created)', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'createElevator').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createElevator: returns json with code+name+max-dimensions values', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'createElevator').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: 1,
        floorCodes: ['123'],
        buildingCode: '123'
      })
    );
  });

  it('createElevator: returns 400 if service fails', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'createElevator').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Elevator already exists'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createElevator: returns json with service message error', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'createElevator').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Error message'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('createElevator: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {};
    const next = spy();

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'createElevator').throws(new Error('Error message'));

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('editElevator: returns status 200 code', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'editElevator').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.editElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('editElevator: returns json with code+name+max-dimensions values', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'editElevator').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.editElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: 1,
        floorCodes: ['123'],
        buildingCode: '123'
      })
    );
  });

  it('editElevator: returns 400 if service fails', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'editElevator').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Elevator already exists'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.editElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('editElevator: returns json with service message error', async () => {
    const body = { name: 'elevator12', floorCodes: ['123'] };
    const req: Partial<Request> = {};
    req.params = { building: '123' };
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'editElevator').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Error message'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.editElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('editElevator: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {};
    const next = spy();

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'editElevator').throws(new Error('Error message'));

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.editElevator(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('getElevatorForBuilding: returns status 200 code', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'getElevatorForBuilding').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.getElevatorForBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('getElevatorForBuilding: returns json with code+name+max-dimensions values', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'getElevatorForBuilding').returns(
      new Promise(resolve => {
        resolve(
          Result.ok<IElevatorDTO>({
            code: 1,
            floorCodes: ['123'],
            buildingCode: '123'
          })
        );
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.getElevatorForBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: 1,
        floorCodes: ['123'],
        buildingCode: '123'
      })
    );
  });

  it('getElevatorForBuilding: returns 400 if service fails', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'getElevatorForBuilding').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Elevator already exists'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.getElevatorForBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getElevatorForBuilding: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'getElevatorForBuilding').returns(
      new Promise(resolve => {
        resolve(Result.fail<IElevatorDTO>('Error message'));
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.getElevatorForBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('getElevatorForBuilding: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { building: '123' };

    const res: Partial<Response> = {};
    const next = spy();

    const elevatorServiceInstance = container.get<IElevatorService>(TYPES.elevatorService);
    stub(elevatorServiceInstance, 'getElevatorForBuilding').throws(new Error('Error message'));

    const ctrl = new ElevatorController(elevatorServiceInstance);

    await ctrl.getElevatorForBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });
});
