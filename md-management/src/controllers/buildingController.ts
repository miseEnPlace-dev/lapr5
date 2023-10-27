import config from '@/config.mjs';
import Container, { Service } from 'typedi';

import { IBuildingDTO } from '@/dto/IBuildingDTO';
import IBuildingService from '@/services/IServices/IBuildingService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IBuildingController from './IControllers/IBuildingController';

@Service()
export default class BuildingController implements IBuildingController {
  private buildingServiceInstance: IBuildingService;
  constructor(buildingServiceInstance?: IBuildingService) {
    if (buildingServiceInstance) this.buildingServiceInstance = buildingServiceInstance;
    else
      this.buildingServiceInstance = Container.get<IBuildingService>(config.services.building.name);
  }

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
