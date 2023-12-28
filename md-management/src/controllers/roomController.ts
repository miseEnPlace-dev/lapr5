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
      const buildingCode = req.params.building;
      const roomsOrError = (await this.roomServiceInstance.getFloorRooms(
        buildingCode,
        floorCode
      )) as Result<IRoomDTO[]>;

      if (roomsOrError.isFailure)
        return res.status(400).json({ message: roomsOrError.errorValue() });

      const roomsDTO = roomsOrError.getValue();
      return res.status(200).json(roomsDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getRoomWithName(req: Request, res: Response, next: NextFunction) {
    try {
      const floorCode = req.params.floor;
      const buildingCode = req.params.building;
      const roomName = req.params.room;
      const roomOrError = await this.roomServiceInstance.getRoomWithName(
        roomName,
        floorCode,
        buildingCode
      );

      if (roomOrError.isFailure) return res.status(400).json({ message: roomOrError.errorValue() });

      const roomDTO = roomOrError.getValue();
      return res.status(200).json(roomDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.building;

      const roomsOrError = await this.roomServiceInstance.getBuildingRooms(buildingCode);

      if (roomsOrError.isFailure)
        return res.status(400).json({ message: roomsOrError.errorValue() });

      const roomsDTO = roomsOrError.getValue();
      return res.status(200).json(roomsDTO);
    } catch (e) {
      return next(e);
    }
  }
}
