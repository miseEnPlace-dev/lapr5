import 'reflect-metadata'; // We need this in order to use @Decorators

import { NextFunction, Request, Response } from 'express';
import sinon, { SinonSpy, spy, stub, assert, match } from 'sinon';
import { beforeEach, describe, it } from 'vitest';

import ConnectorController from '../../../src/controllers/connectorController';
import IConnectorService from '../../../src/services/IServices/IConnectorService';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import { Result } from '../../../src/core/logic/Result';
import { IConnectorDTO } from '../../../src/dto/IConnectorDTO';

describe('connector controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('createConnector: returns status code 201', async () => {
    const body = {
      code: 'A3B3',
      floor1Code: 'A3',
      floor2Code: 'B3'
    };
    const req: Partial<Request> = { body };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'createConnector').resolves(Result.ok<IConnectorDTO>(body as IConnectorDTO));

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.createConnector(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('createConnector: returns json with connector dto', async () => {
    const body = {
      code: 'A3B3',
      floor1Code: 'A3',
      floor2Code: 'B3'
    };
    const req: Partial<Request> = { body };

    const res: Partial<Response> = {
      status: () => <Response>{},
      json: spy()
    };

    stub(res, 'status').returns(res);

    const next: Partial<NextFunction> = () => {};

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'createConnector').resolves(
      Result.ok<IConnectorDTO>({ ...req.body } as IConnectorDTO)
    );

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.createConnector(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(body));
  });

  it('createConnector: returns status code 400 on failed result', async () => {
    const body = {
      code: 'A3B3',
      floor1Code: 'A3',
      floor2Code: 'B3'
    };
    const req: Partial<Request> = { body };

    const res: Partial<Response> = {
      status: spy()
    };

    const next: Partial<NextFunction> = () => {};

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'createConnector').resolves(Result.fail<IConnectorDTO>('error'));

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.createConnector(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('createConnector: returns status code 400 on failed result', async () => {
    const body = {
      code: 'A3B3',
      floor1Code: 'A3',
      floor2Code: 'B3'
    };
    const req: Partial<Request> = { body };

    const res: Partial<Response> = {
      status: () => <Response>{},
      json: spy()
    };

    stub(res, 'status').returns(res);

    const next: Partial<NextFunction> = () => {};

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'createConnector').resolves(Result.fail<IConnectorDTO>('error'));

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.createConnector(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ errors: 'error' }));
  });

  it('createConnector: calls next with error on exception', async () => {
    const body = { code: 'A3B3' };
    const req: Partial<Request> = { body };
    const res: Partial<Response> = {};
    const next = spy();

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'createConnector').throws(new Error('error'));

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.createConnector(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match({ message: 'error' }));
  });

  it('getConnectors: returns json with all connectors as connector dto array', async () => {
    const req: Partial<Request> = { query: {} };

    const res: Partial<Response> = {
      status: () => <Response>{},
      json: spy()
    };

    stub(res, 'status').returns(res);

    const next: Partial<NextFunction> = () => {};

    const connectorList: IConnectorDTO[] = [
      {
        code: 'A3B3',
        floor1Code: 'A3',
        floor2Code: 'B3'
      }
    ];

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'getAllConnectors').resolves(Result.ok<IConnectorDTO[]>(connectorList));

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.getConnectors(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(connectorList));
  });

  it("getConnectors: returns json with all connectors as connector dto array that are between the two buildings' codes", async () => {
    const req: Partial<Request> = { query: { buildingCodes: ['A3', 'B3'] } };

    const res: Partial<Response> = {
      status: () => <Response>{},
      json: spy()
    };

    stub(res, 'status').returns(res);

    const next: Partial<NextFunction> = () => {};

    const connectorList: IConnectorDTO[] = [
      {
        code: 'A3B3',
        floor1Code: 'A3',
        floor2Code: 'B3'
      }
    ];

    const connectorSvc = container.get<IConnectorService>(TYPES.connectorService);
    stub(connectorSvc, 'getConnectorsBetweenBuildings').resolves(
      Result.ok<IConnectorDTO[]>(connectorList)
    );

    const ctrl = new ConnectorController(connectorSvc);
    await ctrl.getConnectors(req as Request, res as Response, next as NextFunction);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match(connectorList));
  }
});
