import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

import ITaskController from './IControllers/ITaskController';
import config from '@/config';
import { z } from 'zod';

const querySchema = z.object({
  id: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class TaskController implements ITaskController {
  constructor() {}

  public async getTaskRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.parse(req.query);

      const page = Number(query.page) || undefined;
      const limit = Number(query.limit) || undefined;

      if (page && limit) {
        const response = await fetch(
          config.tasksApiUrl + `/api/Requests?page=${page}&limit=${limit}`
        );

        const data = await response.json();

        return res.status(200).json(data);
      }

      const response = await fetch(config.tasksApiUrl + '/api/Requests');

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async createSurveillance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const response = await fetch(config.tasksApiUrl + '/api/Requests/surveillance', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async createPickDelivery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const response = await fetch(config.tasksApiUrl + '/api/Requests/pick-delivery', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async acceptRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const response = await fetch(config.tasksApiUrl + `/api/Requests/${req.params.id}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async rejectRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      console.log(req.params.id);
      const response = await fetch(config.tasksApiUrl + `/api/Requests/${req.params.id}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
