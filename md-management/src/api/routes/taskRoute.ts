import { Router } from 'express';
import { z } from 'zod';

import ITaskController from '@/controllers/IControllers/ITaskController';

import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs, validate } from '../middlewares';

const taskRequestCreateSchema = z.object({});

export default (app: Router) => {
  const route = Router();
  const ctrl = container.get<ITaskController>(TYPES.taskController);

  route.get(
    '/task-requests',
    // isAuthenticated,
    // (req, res, next) =>
    //   isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.getTaskRequests(req, res, next)
  );

  app.use(route);
};
