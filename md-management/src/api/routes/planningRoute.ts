import { Router } from 'express';

import IPlanningController from '@/controllers/IControllers/IPlanningController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

import { z } from 'zod';

const planningSchema = z.object({
  fromX: z.string(),
  fromY: z.number().min(0),
  toX: z.number().min(0),
  toY: z.number().min(0),
  fromFloor: z.string(),
  toFloor: z.string(),
  method: z.string()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IPlanningController>(TYPES.planningController);

  route.get(
    '/routes',
    //validate(planningSchema),
    (req, res, next) =>
      // #swagger.tags = ['Route']
      // #swagger.summary = 'Get Route'
      // #swagger.body
      // #swagger.responses[200] = { description: 'Route' }
      // #swagger.responses[400] = { description: 'Error generating route' }
      ctrl.getRoute(req, res, next)
  );

  app.use(route);
};
