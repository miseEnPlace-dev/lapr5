import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify/types';
import IRoomService from '@/services/IServices/IRoomService';
import IRoomController from './IControllers/IRoomController';

import { IRoomDTO } from '@/dto/IRoomDTO';
import { Result } from '@/core/logic/Result';

@injectable()
export default class RoomController implements IRoomController {
  constructor(@inject(TYPES.roomService) private roomServiceInstance: IRoomService) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;
      const floorCode = req.params.floor;
      const roomOrError = await this.roomServiceInstance.createRoom({
        ...req.body,
        buildingCode,
        floorCode
      } as IRoomDTO);

      if (roomOrError.isFailure) return res.status(400).json({ message: roomOrError.errorValue() });

      const floorDTO = roomOrError.getValue();
      return res.status(201).json(floorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const floorCode = req.params.floor;
      const roomsOrError = (await this.roomServiceInstance.getFloorRooms(floorCode)) as Result<
        IRoomDTO[]
      >;

      if (roomsOrError.isFailure)
        return res.status(400).json({ message: roomsOrError.errorValue() });

      const roomsDTO = roomsOrError.getValue();
      return res.status(200).json(roomsDTO);
    } catch (e) {
      return next(e);
    }
  }
}
