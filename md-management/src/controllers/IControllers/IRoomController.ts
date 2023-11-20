import { NextFunction, Request, Response } from 'express';

export default interface IRoomController {
  createRoom(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getFloorRooms(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getRoom(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
