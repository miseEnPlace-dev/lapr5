import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import config from '@/config';
import { ISessionDTO } from '@/dto/ISessionDTO';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
import { z } from 'zod';
import IRequestController from './IControllers/IRequestController';

const querySchema = z.object({
  user: z.literal('me').optional(),
  filter: z.string().optional(),
  value: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class RequestController implements IRequestController {
  constructor(@inject(TYPES.userService) private userService: IUserService) {}

  public async getTaskRequests(
    req: Request & { session: ISessionDTO },
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });
      console.log(query.data);
      const filter = query.data.filter || undefined;
      const value = query.data.value || undefined;
      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;
      const userId = query.data.user ? req.session.id : undefined;

      let response;

      if (!filter && !value && !page && !limit && !userId) {
        response = await fetch(`${config.tasksApiUrl}/api/requests`);
      } else {
        response = await fetch(
          `${config.tasksApiUrl}/api/requests?${filter ? `filter=${filter}` : ''}${
            value ? `&value=${value}` : ''
          }${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}${
            userId ? `&userId=${userId}` : ''
          }`
        );
      }

      const data = await response.json();

      for (const request of data.data) {
        const user = await this.userService.findUserById(request.userId);
        request.user = user.isSuccess ? user.getValue() : null;
      }

      return res.status(response.status).json(data);
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
          `${config.tasksApiUrl}/api/Requests/pick-delivery?limit=${limit}&page=${page}`
        );

        const data = await response.json();

        return res.status(response.status).json(data);
      }

      const response = await fetch(`${config.tasksApiUrl}/api/requests/pick-delivery`);

      const data = await response.json();

      return res.status(response.status).json(data);
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

        return res.status(response.status).json(data);
      }

      const response = await fetch(`${config.tasksApiUrl}/api/requests/surveillance`);

      const data = await response.json();

      return res.status(response.status).json(data);
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

      return res.status(response.status).json(data);
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

      return res.status(response.status).json(data);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();

      return res.status(response.status).json(data);
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

      return res.status(response.status).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
