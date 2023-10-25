import { NextFunction, Request, Response } from 'express';

export default interface IConnectorController {
  getConnectors(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createConnector(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateConnector(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
