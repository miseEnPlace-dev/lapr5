import { Router } from 'express';

import ITaskController from '@/controllers/IControllers/IRequestController';

import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

export default (app: Router) => {
  const route = Router();
  const ctrl = container.get<ITaskController>(TYPES.taskController);

  route.get(
    '/tasks',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.getTaskRequests(req, res, next)
  );

  route.post(
    '/tasks',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.createSurveillance(req, res, next)
  );

  app.use(route);
};
