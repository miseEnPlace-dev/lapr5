import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

import config from '@/config';
import IPlanningController from './IControllers/IPlanningController';

@injectable()
export default class PlanningController implements IPlanningController {
  constructor() {}

  public async getRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromX, fromY, toX, toY, fromFloor, toFloor, method } = req.body;
      const url = `${config.planningApiUrl}/api/route?fromX=${fromX}&fromY=${fromY}&toX=${toX}&toY=${toY}&fromFloor=${fromFloor}&toFloor=${toFloor}&method=${method}`;

      console.log(url);
      const response = await fetch(url);

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
