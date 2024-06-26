import { NextFunction, Request, Response } from 'express';

export default interface IDeviceController {
  createDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDevicesRobots(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  inhibitDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDeviceRobot(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDeviceRobotById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
