import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import IRoomController from './IControllers/IRoomController';
import IRoomService from '@/services/IServices/IRoomService';
import { IRoomDTO } from '@/dto/IRoomDTO';

@Service()
export default class RoomController implements IRoomController {
  private roomServiceInstance: IRoomService;

  constructor() {
    this.roomServiceInstance = Container.get(config.services.room.name) as IRoomService;
  }

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorCode = req.params.floor;
      const roomOrError = (await this.roomServiceInstance.createRoom({
        ...req.body,
        buildingCode,
        floorCode
      } as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure)
        return next({
          status: 400,
          message: roomOrError.errorValue()
        });

      const floorDTO = roomOrError.getValue();
      return res.json(floorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
