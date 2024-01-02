import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { z } from 'zod';

import { TYPES } from '@/loaders/inversify/types';
import { ITaskService } from '@/services/IServices/ITaskService';
import ITaskController from '@/controllers/IControllers/ITaskController';

const querySchema = z.object({
  deviceId: z.string().optional()
});

@injectable()
export default class TaskController implements ITaskController {
  constructor(@inject(TYPES.taskService) private taskService: ITaskService) {}

  public async getTasks(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const query = querySchema.parse(req.query);
      const data = await this.taskService.getTasks(query.deviceId);
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = this.taskService.createTask(req.body);
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
      if (!req.query.deviceId) return res.status(400).json({ message: 'Missing device id' });
      const deviceId = req.query.deviceId as string;
      const sequence = await this.taskService.getTaskSequence(deviceId);
      return res.status(200).json(sequence);
    } catch (e) {
      return next(e);
    }
  }

  public async finishTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await this.taskService.finishTask(req.params.id);
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
