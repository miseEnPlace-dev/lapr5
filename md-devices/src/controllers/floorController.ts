import Container, { Service } from 'typedi';
import config from '../../config.mjs';

import { IFloorDTO } from '@/dto/IFloorDTO';
import IFloorService from '@/services/IServices/IFloorService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IFloorController from './IControllers/IFloorController';

@Service()
export default class FloorController implements IFloorController {
  private floorServiceInstance: IFloorService;

  constructor() {
    this.floorServiceInstance = Container.get(config.services.floor.name) as IFloorService;
  }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.createFloor(
        req.body as IFloorDTO
      )) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(402).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.updateFloor(
        req.body as IFloorDTO
      )) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }
}
