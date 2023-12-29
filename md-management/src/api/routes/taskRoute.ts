import { Router } from 'express';

import ITaskController from '@/controllers/IControllers/ITaskController';

import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

export default (app: Router) => {
  const route = Router();
  const ctrl = container.get<ITaskController>(TYPES.taskController);

  route.get(
    '/task-requests',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.getTaskRequests(req, res, next)
  );

  route.get(
    '/task-requests/sequence',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.task.name),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Tasks Sequence'
      ctrl.getTaskSequence(req, res, next)
  );

  route.post(
    '/task-requests/surveillance',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.createSurveillance(req, res, next)
  );

  route.post(
    '/task-requests/pick-delivery',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.task.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.createPickDelivery(req, res, next)
  );

  route.patch(
    '/task-requests/:id/accept',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, [defaultRoles.task.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.acceptRequest(req, res, next)
  );

  route.patch(
    '/task-requests/:id/reject',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, [defaultRoles.task.name]),
    (req, res, next) =>
      // #swagger.tags = ['Tasks']
      // #swagger.summary = 'Get Task Requests'
      ctrl.rejectRequest(req, res, next)
  );

  app.use(route);
};
