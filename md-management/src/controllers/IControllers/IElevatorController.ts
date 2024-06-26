import { NextFunction, Request, Response } from 'express';

export default interface IElevatorController {
  getElevatorForBuilding(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createElevator(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  editElevator(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
