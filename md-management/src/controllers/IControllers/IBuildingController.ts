import { NextFunction, Request, Response } from 'express';

export default interface IBuildingController {
  getBuildings(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createBuilding(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateBuilding(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getBuildingsWithMinMaxFloors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  getBuildings(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getBuildingWithCode(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
