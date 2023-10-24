import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import IConnectorService from '@/services/IServices/IConnectorService';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import IConnectorController from './IControllers/IConnectorController';

@Service()
export default class ConnectorController implements IConnectorController {
  private connectorServiceInstance: IConnectorService;
  constructor() {
    this.connectorServiceInstance = Container.get(
      config.services.connector.name
    ) as IConnectorService;
  }

  public async createConnector(req: Request, res: Response, next: NextFunction) {
    try {
      const connectorOrError = (await this.connectorServiceInstance.createConnector(
        req.body as IConnectorDTO
      )) as Result<IConnectorDTO>;

      if (connectorOrError.isFailure)
        return res.status(400).json({
          errors: connectorOrError.errorValue()
        });

      const connectorDTO = connectorOrError.getValue();
      return res.json(connectorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
