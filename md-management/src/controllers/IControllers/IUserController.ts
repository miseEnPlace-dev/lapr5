import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  signUp(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signIn(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signOut(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getMe(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  deleteUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  activateUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getUsers(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
}
