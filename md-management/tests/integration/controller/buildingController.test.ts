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
    stub(buildingServiceInstance, 'createBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: '123',
        name: body.name,
        maxDimensions: { width: 10, length: 10 }
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
    stub(buildingServiceInstance, 'createBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: '123',
        name: body.name,
        maxDimensions: { width: 10, length: 10 }
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

  it('createBuilding: returns 400 when error occurs', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'createBuilding').resolves(
      Result.fail<IBuildingDTO>('Building already exists')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createBuilding: returns json with service message error', async () => {
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
    stub(buildingServiceInstance, 'createBuilding').resolves(
      Result.fail<IBuildingDTO>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('createBuilding: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};

    const res: Partial<Response> = {};
    const next = spy();

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'createBuilding').throws(new Error('Error message'));

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('updateBuilding: returns status 200 code (ok)', async () => {
    const body = {
      name: 'building',
      description: 'new description',
      maxDimensions: { width: 10, length: 10 }
    };
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = params;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: params.code,
        name: body.name,
        description: body.description,
        maxDimensions: body.maxDimensions
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('updateBuilding: returns json with updated building values', async () => {
    const body = {
      name: 'building',
      description: 'new description',
      maxDimensions: { width: 10, length: 10 }
    };
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: params.code,
        name: body.name,
        description: body.description,
        maxDimensions: body.maxDimensions
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: params.code,
        name: body.name,
        description: body.description,
        maxDimensions: body.maxDimensions
      })
    );
  });

  it('updateBuilding: returns 400 when error occurs', async () => {
    const body = {
      name: 'building',
      description: 'new description',
      maxDimensions: { width: 10, length: 10 }
    };
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.fail<IBuildingDTO>('Building does not exist')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('updateBuilding: returns json with service message error', async () => {
    const body = {
      name: 'building',
      description: 'new description',
      maxDimensions: { width: 10, length: 10 }
    };
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.body = body;
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.fail<IBuildingDTO>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('updateBuilding: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '1' };

    const res: Partial<Response> = {};
    const next = spy();

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').throws(new Error('Error message'));

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('getBuildings: returns status 200 code (ok)', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildings').resolves(
      Result.ok<IBuildingDTO[]>([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.getBuildings(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('getBuildings: returns json with buildings found', async () => {
    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const req: Partial<Request> = {};
    req.query = {};

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildings').resolves(
      Result.ok<IBuildingDTO[]>([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildings(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );
  });

  it('getBuildings: return 400 when error occurs', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildings').resolves(
      Result.fail<IBuildingDTO[]>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildings(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getBuildings: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildings').resolves(
      Result.fail<IBuildingDTO[]>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildings(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('getBuildings: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.query = {};

    const res: Partial<Response> = {};
    const next = spy();

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildings').throws(new Error('Error message'));

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildings(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('updateBuilding: returns status 200 code (ok)', async () => {
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.params = params;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: params.code,
        name: 'building',
        maxDimensions: { width: 10, length: 10 }
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('updateBuilding: returns json with updated building values', async () => {
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.ok<IBuildingDTO>({
        code: params.code,
        name: 'building',
        maxDimensions: { width: 10, length: 10 }
      })
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        code: params.code,
        name: 'building',
        maxDimensions: { width: 10, length: 10 }
      })
    );
  });

  it('updateBuilding: returns 400 when error occurs', async () => {
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.fail<IBuildingDTO>('Building does not exist')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('updateBuilding: returns json with service message error', async () => {
    const params = { code: '1' };
    const req: Partial<Request> = {};
    req.params = params;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').resolves(
      Result.fail<IBuildingDTO>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('updateBuilding: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.params = { code: '1' };

    const res: Partial<Response> = {};
    const next = spy();

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'updateBuilding').throws(new Error('Error message'));

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('getBuildingsWithMinMaxFloors: returns status 200 code (ok)', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '1', maxFloors: '10' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);
    stub(buildingServiceInstance, 'getBuildingsWithMinMaxFloors').resolves(
      Result.ok<IBuildingDTO[]>([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('getBuildingsWithMinMaxFloors: returns json with buildings found', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '1', maxFloors: '10' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);

    stub(buildingServiceInstance, 'getBuildingsWithMinMaxFloors').resolves(
      Result.ok<IBuildingDTO[]>([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match([
        {
          code: '1',
          name: 'building',
          maxDimensions: { width: 10, length: 10 }
        }
      ])
    );
  });

  it('getBuildingsWithMinMaxFloors: return 400 when error occurs', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '1', maxFloors: '10' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);

    stub(buildingServiceInstance, 'getBuildingsWithMinMaxFloors').resolves(
      Result.fail<IBuildingDTO[]>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getBuildingsWithMinMaxFloors: returns json with service message error', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '1', maxFloors: '10' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);

    stub(buildingServiceInstance, 'getBuildingsWithMinMaxFloors').resolves(
      Result.fail<IBuildingDTO[]>('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Error message' }));
  });

  it('getBuildingsWithMinMaxFloors: forwards error to next function when service throws error', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '1', maxFloors: '10' };

    const res: Partial<Response> = {};
    const next = spy();

    const buildingServiceInstance = container.get<IBuildingService>(TYPES.buildingService);

    stub(buildingServiceInstance, 'getBuildingsWithMinMaxFloors').throws(
      new Error('Error message')
    );

    const ctrl = new BuildingController(buildingServiceInstance);
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'Error message' }));
  });

  it('getBuildingsWithMinMaxFloors: returns 400 when minFloors > maxFloors', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '10', maxFloors: '1' };

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const ctrl = new BuildingController(container.get<IBuildingService>(TYPES.buildingService));
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('getBuildingsWithMinMaxFloors: returns json with error message when minFloors > maxFloors', async () => {
    const req: Partial<Request> = {};
    req.query = { minFloors: '10', maxFloors: '1' };

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.send = spy();

    const next: Partial<NextFunction> = () => {};

    const ctrl = new BuildingController(container.get<IBuildingService>(TYPES.buildingService));
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.send);
    assert.calledWith(
      <SinonSpy>res.send,
      match({ message: 'minFloors must be less than maxFloors' })
    );
  });
});
