import { Service } from '@freshgum/typedi';
import { NextFunction, Request, Response } from 'express';

import { Result } from '@/core/logic/Result';
import { IRoomDTO } from '@/dto/IRoomDTO';
import IRoomService from '@/services/IServices/IRoomService';
import RoomService from '@/services/roomService';
import IRoomController from './IControllers/IRoomController';

@Service([RoomService])
export default class RoomController implements IRoomController {
  constructor(private roomServiceInstance: IRoomService) {}

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
