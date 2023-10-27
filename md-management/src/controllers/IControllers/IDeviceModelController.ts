import { NextFunction, Request, Response } from 'express';

export default interface IDeviceModelController {
  createDeviceModel(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
