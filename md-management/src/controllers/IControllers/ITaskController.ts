import { NextFunction, Request, Response } from 'express';

export default interface ITaskController {
  getTasks(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createTask(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTaskSequence(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
