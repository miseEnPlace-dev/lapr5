import { NextFunction, Request, Response } from 'express';

export default interface IFloorController {
  createFloor(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateFloor(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
