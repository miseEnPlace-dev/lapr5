import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { z } from 'zod';

import IConnectorService from '@/services/IServices/IConnectorService';
import IConnectorController from './IControllers/IConnectorController';

import { Result } from '@/core/logic/Result';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { TYPES } from '../loaders/inversify/types';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

const buildingIdsSchema = z.object({
  buildingCodes: z
    .array(
      z
        .string()
        .min(1)
        .max(5)
    )
    .length(2)
});

const querySchema = z.object({
  minFloors: z.string().optional(),
  maxFloors: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class ConnectorController implements IConnectorController {
  constructor(@inject(TYPES.connectorService) private connectorSvcInstance: IConnectorService) {}

  public async createConnector(req: Request, res: Response, next: NextFunction) {
    try {
      const connectorOrError = await this.connectorSvcInstance.createConnector(
        req.body as IConnectorDTO
      );

      if (connectorOrError.isFailure)
        return res.status(400).json({
          errors: connectorOrError.errorValue()
        });

      const connectorDTO = connectorOrError.getValue();
      return res.status(201).json(connectorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getConnectorByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const connectorOrError = await this.connectorSvcInstance.getConnectorByCode(code);

      if (connectorOrError.isFailure)
        return res.status(400).json({
          errors: connectorOrError.errorValue()
        });

      const connectorDTO = connectorOrError.getValue();
      return res.status(200).json(connectorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getConnectors(req: Request, res: Response, next: NextFunction) {
    try {
      let connectorsOrError: Result<IPaginationDTO<IConnectorDTO>>;

      const query = querySchema.parse(req.query);

      const page = Number(query.page) || undefined;
      const limit = Number(query.limit) || undefined;

      if (!req.query.buildingCodes) {
        connectorsOrError = await this.connectorSvcInstance.getAllConnectors(page, limit);
      } else {
        const parsed = buildingIdsSchema.safeParse(req.query);
        if (!parsed.success) return res.status(400).send(parsed.error);
        const { buildingCodes } = parsed.data;
        connectorsOrError = await this.connectorSvcInstance.getConnectorsBetweenBuildings(
          buildingCodes[0],
          buildingCodes[1],
          page,
          limit
        );
      }

      if (connectorsOrError.isFailure)
        return res.status(400).json({
          errors: connectorsOrError.errorValue()
        });

      const connectorsDTO = connectorsOrError.getValue();
      return res.status(200).json(connectorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateConnector(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;

      const connectorOrError = (await this.connectorSvcInstance.updateConnector(
        code,
        req.body as Partial<IConnectorDTO>
      )) as Result<IConnectorDTO>;

      if (connectorOrError.isFailure)
        return res.status(400).json({
          errors: connectorOrError.errorValue()
        });

      const connectorDTO = connectorOrError.getValue();
      return res.status(200).json(connectorDTO);
    } catch (e) {
      return next(e);
    }
  }
}
