import { Service } from '@freshgum/typedi';
import { NextFunction, Request, Response } from 'express';

import { Result } from '@/core/logic/Result';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import IFloorService from '@/services/IServices/IFloorService';
import FloorService from '@/services/floorService';
import { z } from 'zod';
import IFloorController from './IControllers/IFloorController';

@Service([FloorService])
export default class FloorController implements IFloorController {
  constructor(private floorServiceInstance: IFloorService) {}

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
      const floorCode = req.params.code;
      const floorOrError = (await this.floorServiceInstance.updateFloor({
        ...req.body,
        buildingCode,
        code: floorCode
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
