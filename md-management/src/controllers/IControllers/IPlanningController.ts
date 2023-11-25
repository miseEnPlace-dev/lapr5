import { NextFunction, Request, Response } from 'express';

export default interface IPlanningController {
  getRoute(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
