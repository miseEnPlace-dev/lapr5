import { NextFunction, Request, Response } from 'express';

export default interface IRequestController {
  getTaskRequests(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTaskRequestsPD(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTaskRequestsSV(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createSurveillance(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createPickDelivery(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  acceptRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  rejectRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
