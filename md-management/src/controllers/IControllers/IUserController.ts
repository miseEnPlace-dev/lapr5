import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  signUp(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signIn(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signOut(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getMe(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
}
