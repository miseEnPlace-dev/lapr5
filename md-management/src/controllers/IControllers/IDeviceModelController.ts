import { NextFunction, Request, Response } from 'express';

export default interface IDeviceModelController {
  getDeviceModels(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDeviceModelWithCode(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createDeviceModel(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
