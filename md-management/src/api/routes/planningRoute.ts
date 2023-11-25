import { Router } from 'express';

import IPlanningController from '@/controllers/IControllers/IPlanningController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IPlanningController>(TYPES.planningController);

  route.get('/routes', (req, res, next) =>
    // #swagger.tags = ['Route']
    // #swagger.summary = 'Get Route'
    // #swagger.body
    // #swagger.responses[200] = { description: 'Route' }
    // #swagger.responses[400] = { description: 'Error generating route' }
    ctrl.getRoute(req, res, next)
  );

  app.use(route);
};
