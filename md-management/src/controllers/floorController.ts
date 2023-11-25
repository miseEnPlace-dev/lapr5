import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { z } from 'zod';

import { TYPES } from '@/loaders/inversify/types';
import IFloorService from '@/services/IServices/IFloorService';
import IFloorController from './IControllers/IFloorController';

import { Result } from '@/core/logic/Result';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';

@injectable()
export default class FloorController implements IFloorController {
  constructor(@inject(TYPES.floorService) private floorServiceInstance: IFloorService) { }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorOrError = (await this.floorServiceInstance.createFloor({
        ...req.body,
        buildingCode
      } as IFloorDTO)) as Result<IFloorDTO>;

      if (floorOrError.isFailure)
        return res.status(400).json({ message: floorOrError.errorValue() });

      const floorDTO = floorOrError.getValue();
      return res.status(201).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const floorsOrError = (await this.floorServiceInstance.getAllFloors()) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure)
        return res.status(400).json({
          message: floorsOrError.errorValue()
        });

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorCode = req.params.code;
      const floorOrError = await this.floorServiceInstance.updateFloor({
        ...req.body,
        buildingCode,
        code: floorCode
      } as IFloorDTO);

      if (floorOrError.isFailure)
        return res.status(400).json({ message: floorOrError.errorValue() });

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;

      const filterSchema = z.object({ filter: z.string().optional() });
      const filter = filterSchema.safeParse(req.query);
      if (!filter.success) return res.status(400).json({ errors: filter.error });

      const floorsOrError = (await this.floorServiceInstance.getBuildingFloors(
        buildingCode,
        filter.data.filter
      )) as Result<IFloorDTO[]>;

      if (floorsOrError.isFailure)
        return res.status(400).json({
          message: floorsOrError.errorValue()
        });

      const floorsDTO = floorsOrError.getValue();
      return res.status(200).json(floorsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async uploadMap(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.uploadMap(
        req.params.code,
        req.body as IFloorMapDTO
      )) as Result<IFloorMapDTO>;

      if (floorOrError.isFailure)
        return res.status(400).json({
          message: floorOrError.errorValue()
        });

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorWithBuildingCode(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorCode = req.params.code;

      const floorOrError = (await this.floorServiceInstance.getFloorWithBuildingCode(
        buildingCode,
        floorCode
      )) as Result<IFloorDTO>;

      if (floorOrError.isFailure)
        return res.status(400).json({
          message: floorOrError.errorValue()
        });

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorWithCode(req: Request, res: Response, next: NextFunction) {
    try {
      const floorCode = req.params.code;

      const floorOrError = (await this.floorServiceInstance.getFloorWithCode(floorCode)) as Result<
        IFloorDTO
      >;

      if (floorOrError.isFailure)
        return res.status(400).json({
          message: floorOrError.errorValue()
        });

      const floorDTO = floorOrError.getValue();
      return res.status(200).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }
}
