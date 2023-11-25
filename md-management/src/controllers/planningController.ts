import { NextFunction, Request, Response } from 'express';
import http from 'http';
import { injectable } from 'inversify';
import fetch from 'node-fetch';

import config from '@/config';
import IPlanningController from './IControllers/IPlanningController';

@injectable()
export default class PlanningController implements IPlanningController {
  constructor() {}

  private httpAgent = new http.Agent({});

  public async getRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const url = `${config.planningApiUrl}/api/route?from=${req.query.from}&to=${req.query.to}&method=${req.query.method}`;

      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        agent: this.httpAgent
      });

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
