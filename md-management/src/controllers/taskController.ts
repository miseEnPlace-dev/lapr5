import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import config from '@/config';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
//import { z } from 'zod';
import ITaskController from './IControllers/ITaskController';
import { ITaskService } from '@/services/IServices/ITaskService';

/*const querySchema = z.object({
  filter: z.string().optional(),
  value: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});*/

@injectable()
export default class TaskController implements ITaskController {
  constructor(
    @inject(TYPES.taskService) private taskService: ITaskService,
    @inject(TYPES.userService) private userService: IUserService
  ) {}

  public async getTasks(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await fetch(`${config.tasksApiUrl}/api/tasks`);

      const data = await response.json();
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
      const response = await fetch(config.tasksApiUrl + '/api/tasks', {
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
}
