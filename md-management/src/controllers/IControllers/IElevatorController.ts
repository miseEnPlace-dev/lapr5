import { NextFunction, Request, Response } from 'express';

export default interface IElevatorController {
  createElevator(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
