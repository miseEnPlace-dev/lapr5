import { NextFunction, Request, Response } from 'express';

export default interface IElevatorController {
  getElevator(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createElevator(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
