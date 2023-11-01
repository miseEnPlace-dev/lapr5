import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../loaders/inversify/types';

import IBuildingService from '@/services/IServices/IBuildingService';
import IBuildingController from './IControllers/IBuildingController';

import { Result } from '@/core/logic/Result';
import { IBuildingDTO } from '@/dto/IBuildingDTO';

@injectable()
export default class BuildingController implements IBuildingController {
  constructor(@inject(TYPES.buildingService) private buildingServiceInstance: IBuildingService) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.createBuilding(
        req.body as IBuildingDTO
      )) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure)
        return res.status(400).json({ error: buildingOrError.errorValue() });

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
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

      if (buildingOrError.isFailure)
        return res.status(400).json({ error: buildingOrError.errorValue() });

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingsWithMinMaxFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const min = Number(req.query.minFloors);
      const max = Number(req.query.maxFloors);

      if (min > max)
        return res.status(400).send({
          message: 'minFloors must be less than maxFloors'
        });

      const buildingsOrError = (await this.buildingServiceInstance.getBuildingsWithMinMaxFloors(
        min,
        max
      )) as Result<IBuildingDTO[]>;

      if (!buildingsOrError) return res.status(404).send();

      return res.status(200).json(buildingsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.minFloors && req.query.maxFloors) {
        return this.getBuildingsWithMinMaxFloors(req, res, next);
      }

      const buildingsOrError = (await this.buildingServiceInstance.getBuildings()) as Result<
        IBuildingDTO[]
      >;

      if (!buildingsOrError) return res.status(404).send();

      return res.status(200).json(buildingsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
