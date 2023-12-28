import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../loaders/inversify/types';

import { Result } from '@/core/logic/Result';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { z } from 'zod';
import ITaskController from './IControllers/ITaskController';
import config from '@/config';

@injectable()
export default class TaskController implements ITaskController {
  constructor() {}

  public async getTaskRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const response = await fetch(config.tasksApiUrl + '/api/Requests');

      const data = await response.json();

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}
