import { NextFunction, Request, Response } from 'express';

export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getBuildingsWithMinMaxFloors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
