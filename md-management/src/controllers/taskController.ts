import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import config from '@/config';
import { TYPES } from '@/loaders/inversify/types';
import { ITaskService } from '@/services/IServices/ITaskService';
import IUserService from '@/services/IServices/IUserService';
import { z } from 'zod';
import ITaskController from './IControllers/ITaskController';

const querySchema = z.object({
  filter: z.string().optional(),
  value: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class TaskController implements ITaskController {
  constructor(
    @inject(TYPES.taskService) private taskService: ITaskService,
    @inject(TYPES.userService) private userService: IUserService
  ) {}

  public async getTaskRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const filter = query.data.filter || undefined;
      const value = query.data.value || undefined;
      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;

      let response;

      if (!filter && !value && !page && !limit) {
        response = await fetch(`${config.tasksApiUrl}/api/requests`);
      } else {
        response = await fetch(
          `${config.tasksApiUrl}/api/requests?${filter ? `filter=${filter}` : ''}${
            value ? `&value=${value}` : ''
          }${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
        );
      }

      const data = await response.json();

      for (const request of data.data) {
        const user = await this.userService.findUserById(request.userId);
        request.user = user.isSuccess ? user.getValue() : null;
      }

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async getTaskRequestsPD(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;

      if (page && limit) {
        const response = await fetch(
          `${config.tasksApiUrl}/api/requests/pick-delivery?limit=${limit}&page=${page}`
        );

        const data = await response.json();

        return res.status(200).json(data);
      }

      const response = await fetch(`${config.tasksApiUrl}/api/requests/pick-delivery`);

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async getTaskRequestsSV(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;

      if (page && limit) {
        const response = await fetch(
          `${config.tasksApiUrl}/api/Requests/surveillance?limit=${limit}&page=${page}`
        );

        const data = await response.json();

        return res.status(200).json(data);
      }

      const response = await fetch(`${config.tasksApiUrl}/api/requests/surveillance`);

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async getTaskSequence(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const sequence = await this.taskService.getTaskSequence();
      return res.status(200).json(sequence);
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
      const response = await fetch(config.tasksApiUrl + '/api/requests/surveillance', {
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
      const response = await fetch(config.tasksApiUrl + '/api/requests/pick-delivery', {
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
      const response = await fetch(config.tasksApiUrl + `/api/requests/${req.params.id}/accept`, {
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
      const response = await fetch(config.tasksApiUrl + `/api/requests/${req.params.id}/reject`, {
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
