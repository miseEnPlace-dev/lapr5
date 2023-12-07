import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../loaders/inversify/types';

import IBuildingService from '@/services/IServices/IBuildingService';
import IBuildingController from './IControllers/IBuildingController';

import { Result } from '@/core/logic/Result';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { z } from 'zod';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

const querySchema = z.object({
  minFloors: z.string().optional(),
  maxFloors: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class BuildingController implements IBuildingController {
  constructor(@inject(TYPES.buildingService) private buildingServiceInstance: IBuildingService) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.createBuilding(
        req.body as IBuildingDTO
      )) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).json({
          message: buildingOrError.errorValue()
        });
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.updateBuilding(
        req.body as Partial<IBuildingDTO>,
        req.params.code
      )) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).json({ message: buildingOrError.errorValue() });
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingsWithMinMaxFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const query = querySchema.parse(req.query);

      const min = Number(query.minFloors);
      const max = Number(query.maxFloors);
      const page = Number(query.page) || undefined;
      const limit = Number(query.limit) || undefined;

      if (min > max) {
        return res.status(400).send({
          message: 'minFloors must be less than maxFloors'
        });
      }

      const buildingsOrError = (await this.buildingServiceInstance.getBuildingsWithMinMaxFloors(
        min,
        max,
        page,
        limit
      )) as Result<IPaginationDTO<IBuildingDTO>>;

      if (buildingsOrError.isFailure) {
        return res.status(400).json({ message: buildingsOrError.errorValue() });
      }

      return res.status(200).json(buildingsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const query = querySchema.parse(req.query);

      if (query.minFloors && query.maxFloors)
        return this.getBuildingsWithMinMaxFloors(req, res, next);

      // TODO: validate page & limit
      const page = Number(query.page) || undefined;
      const limit = Number(query.limit) || undefined;

      const buildingsOrError = (await this.buildingServiceInstance.getBuildings(
        page,
        limit
      )) as Result<IPaginationDTO<IBuildingDTO>>;

      if (buildingsOrError.isFailure) {
        return res.status(400).json({ message: buildingsOrError.errorValue() });
      }

      return res.status(200).json(buildingsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingWithCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;

      const buildingOrError = await this.buildingServiceInstance.getBuildingWithCode(code);

      if (buildingOrError.isFailure) {
        return res.status(400).json({ message: buildingOrError.errorValue() });
      }

      return res.status(200).json(buildingOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
