import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IFloorDTO } from '@/dto/IFloorDTO';
import IFloorService from '@/services/IServices/IFloorService';
import IFloorController from './IControllers/IFloorController';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';

@Service()
export default class FloorController implements IFloorController {
  private floorServiceInstance: IFloorService;

  constructor() {
    this.floorServiceInstance = Container.get(config.services.floor.name) as IFloorService;
  }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorOrError = (await this.floorServiceInstance.createFloor({
        ...req.body,
        buildingCode
      } as IFloorDTO)) as Result<IFloorDTO>;

      if (floorOrError.isFailure)
        return next({
          status: 400,
          message: floorOrError.errorValue()
        });

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorOrError = (await this.floorServiceInstance.updateFloor({
        ...req.body,
        buildingCode
      } as IFloorDTO)) as Result<IFloorDTO>;

      if (floorOrError.isFailure) return res.status(400).json({ error: floorOrError.errorValue() });

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorsOrError = (await this.floorServiceInstance.getBuildingFloors(
        buildingCode
      )) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure)
        return res.status(400).send({
          message: floorsOrError.errorValue()
        });

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorsWithElevator(req: Request, res: Response, next: NextFunction) {
    if (!req.query.hasElevator || !req.query.building) return res.status(400).send();
    const query = { hasElevator: req.query.hasElevator, building: req.params.building };

    try {
      const floorsOrError = (await this.floorServiceInstance.getFloorsWithElevator(
        query.building as string
      )) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure) return res.status(400).send();

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async uploadMap(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) return res.status(401).send();
      const map = JSON.parse(req.file.buffer.toString());
      const newMap = map.maze as IFloorMapDTO;
      const floorOrError = (await this.floorServiceInstance.uploadMap(
        req.params.code,
        newMap
      )) as Result<IFloorMapDTO>;

      if (floorOrError.isFailure) return res.status(400).send();

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }
}
