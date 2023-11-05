import { Router } from 'express';
import { z } from 'zod';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { validate } from '../middlewares';

const buildingCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(5),
  name: z
    .string()
    .max(50)
    .optional(),
  description: z
    .string()
    .max(255)
    .optional(),
  maxDimensions: z.object({
    width: z.number().min(1),
    length: z.number().min(1)
  })
});

const buildingUpdateSchema = z.object({
  name: z
    .string()
    .max(50)
    .optional(),
  description: z
    .string()
    .max(255)
    .optional(),
  maxDimensions: z
    .object({
      width: z.number().min(1),
      length: z.number().min(1)
    })
    .optional()
});

export default (app: Router) => {
  const route = Router();
  const ctrl = container.get<IBuildingController>(TYPES.buildingController);

  route.get('/buildings', (req, res, next) =>
    // #swagger.tags = ['Buildings']
    ctrl.getBuildings(req, res, next)
  );
  route.post('/buildings', validate(buildingCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Buildings']
    ctrl.createBuilding(req, res, next)
  );

  route.put('/buildings/:code', validate(buildingUpdateSchema), (req, res, next) =>
    // #swagger.tags = ['Buildings']
    ctrl.updateBuilding(req, res, next)
  );

  app.use(route);
};
