import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { IFloorDTO } from '@/dto/IFloorDTO';
import IFloorService from '@/services/IServices/IFloorService';
import { Result } from '@/core/logic/Result';
import IFloorController from './IControllers/IFloorController';
import { BuildingCode } from '@/domain/building/buildingCode';

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

  public async getBuildingFloors(req: Request, res: Response, next: NextFunction) {
    const buildingId = BuildingCode.create(req.query.buildingId as string);

    if (buildingId.isFailure) return res.status(400).send();

    try {
      // const filter = req.query.filter as string | undefined;

      const floorsOrError = (await this.floorServiceInstance.getBuildingFloors(
        buildingId.getValue()
      )) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure) return res.status(404).send();

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorsWithElevator(req: Request, res: Response, next: NextFunction) {
    const buildingId = BuildingCode.create(req.query.buildingId as string);

    if (buildingId.isFailure) return res.status(400).send();

    try {
      const floorsOrError = (await this.floorServiceInstance.getFloorsWithElevator(
        buildingId.getValue()
      )) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure) return res.status(404).send();

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }
}
