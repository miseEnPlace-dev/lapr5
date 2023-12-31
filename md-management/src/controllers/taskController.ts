import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import config from '@/config';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
//import { z } from 'zod';
import IDeviceService from '@/services/IServices/IDeviceService';
import { ITaskService } from '@/services/IServices/ITaskService';
import ITaskController from './IControllers/ITaskController';

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
    @inject(TYPES.userService) private userService: IUserService,
    @inject(TYPES.deviceService) private deviceService: IDeviceService
  ) {}

  public async getTasks(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await fetch(`${config.tasksApiUrl}/api/tasks`);

      const data = await response.json();
      const tasks = [];

      for (const task of data.data) {
        const userOrError = await this.userService.findUserById(task.userId);
        if (userOrError.isFailure) return res.status(400).json({ message: userOrError.error });

        const deviceOrError = await this.deviceService.getDeviceRobotWithCode(task.deviceId);
        if (deviceOrError.isFailure) return res.status(400).json({ message: deviceOrError.error });

        const user = userOrError.getValue();
        const device = deviceOrError.getValue();
        tasks.push({ ...task, user, device });
      }

      data.data = tasks;

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
}
