import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  signUp(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signIn(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signInWithGoogle(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  signOut(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getMe(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  userExists(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  deleteUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  updateUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  activateUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  rejectUser(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getUsers(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
  getRequests(req: Request, res: Response, next?: NextFunction): Promise<Response | void>;
}
