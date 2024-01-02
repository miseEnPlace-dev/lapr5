import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { z } from 'zod';

import { ISessionDTO } from '@/dto/ISessionDTO';
import { TYPES } from '@/loaders/inversify/types';
import IRequestController from './IControllers/IRequestController';
import { IRequestService } from '@/services/IServices/IRequestService';

const querySchema = z.object({
  user: z.string().optional(),
  filter: z.string().optional(),
  value: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class RequestController implements IRequestController {
  constructor(@inject(TYPES.requestService) private requestSvc: IRequestService) {}

  public async getTaskRequests(
    req: Request & { session: ISessionDTO },
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const { filter, value, user, page, limit } = query.data;
      const userId = user === 'me' ? req.session.id : user;

      const data = await this.requestSvc.getRequests(filter, value, userId, page, limit);
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

      const { page, limit } = query.data;

      const data = await this.requestSvc.getPDRequests(page, limit);
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

      const { page, limit } = query.data;

      const data = await this.requestSvc.getSVRequests(page, limit);
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
      const data = await this.requestSvc.createSurveillance(req.body);
      return res.status(201).json(data);
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
      const data = await this.requestSvc.createPickDelivery(req.body);
      return res.status(201).json(data);
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
      const deviceId = req.body.deviceId;
      if (!deviceId) return res.status(400).json({ message: 'deviceId is required' });
      const data = await this.requestSvc.acceptRequest(req.params.id, deviceId as string);
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
      const data = await this.requestSvc.rejectRequest(req.params.id);
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
