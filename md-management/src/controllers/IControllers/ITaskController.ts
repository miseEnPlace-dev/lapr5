import { NextFunction, Request, Response } from 'express';

export default interface ITaskController {
  getTaskRequests(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
