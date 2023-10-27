import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IRoomDTO } from '@/dto/IRoomDTO';
import IRoomService from '@/services/IServices/IRoomService';
import IRoomController from './IControllers/IRoomController';

@Service()
export default class RoomController implements IRoomController {
  private roomServiceInstance: IRoomService;

  constructor(roomServiceInstance?: IRoomService) {
    if (roomServiceInstance) this.roomServiceInstance = roomServiceInstance;
    else this.roomServiceInstance = Container.get(config.services.room.name) as IRoomService;
  }

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = (await this.roomServiceInstance.createRoom(
        req.body as IRoomDTO
      )) as Result<IRoomDTO>;

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
