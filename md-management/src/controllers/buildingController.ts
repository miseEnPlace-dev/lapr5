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
  constructor() {
    this.buildingServiceInstance = Container.get(config.services.building.name) as IBuildingService;
  }

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = (await this.buildingServiceInstance.createBuilding(
        req.body as IBuildingDTO
      )) as Result<IBuildingDTO>;

      if (roleOrError.isFailure) return res.status(400).send();

      const roleDTO = roleOrError.getValue();
      return res.json(roleDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingsWithMinMaxFloors(req: Request, res: Response, next: NextFunction) {}
}
