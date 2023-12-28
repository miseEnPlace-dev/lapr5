import { NextFunction, Request, Response } from 'express';

export default interface IRoomController {
  createRoom(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getFloorRooms(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getBuildingRooms(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getRoomWithName(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
