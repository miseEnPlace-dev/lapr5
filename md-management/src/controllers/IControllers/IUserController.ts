import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  getMe(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
}
