import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import BuildingController from '../../../src/controllers/buildingController';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';

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

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves();

    stub(buildingRepo, 'findByCode').resolves(null);

    container.rebind<IBuildingRepo>(TYPES.buildingRepo).toConstantValue(buildingRepo);

    const buildingServiceInstance = container.get<IBuildingRepo>(TYPES.buildingService);

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createBuilding: returns json with building data', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves();

    stub(buildingRepo, 'findByCode').resolves(null);

    container.rebind<IBuildingRepo>(TYPES.buildingRepo).toConstantValue(buildingRepo);

    const buildingServiceInstance = container.get<IBuildingRepo>(TYPES.buildingService);

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(body));
  });

  it('createBuilding: returns status 400 code (bad request) when building already exists', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves();

    stub(buildingRepo, 'findByCode').resolves({});

    container.rebind<IBuildingRepo>(TYPES.buildingRepo).toConstantValue(buildingRepo);

    const buildingServiceInstance = container.get<IBuildingRepo>(TYPES.buildingService);

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createBuilding: returns json with error message when building already exists', async () => {
    const body = { name: 'building12', maxDimensions: { width: 10, length: 10 }, code: '123' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();

    const next: Partial<NextFunction> = () => {};

    const buildingRepo = container.get<IBuildingRepo>(TYPES.buildingRepo);
    stub(buildingRepo, 'save').resolves();

    stub(buildingRepo, 'findByCode').resolves({});

    container.rebind<IBuildingRepo>(TYPES.buildingRepo).toConstantValue(buildingRepo);

    const buildingServiceInstance = container.get<IBuildingRepo>(TYPES.buildingService);

    const ctrl = new BuildingController(buildingServiceInstance);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'Building already exists' }));
  });
});
