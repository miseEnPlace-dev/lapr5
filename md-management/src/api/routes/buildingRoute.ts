import { Router } from 'express';
import { z } from 'zod';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import { TYPES, container } from '@/loaders/inversify';
import { validate } from '../middlewares/validate';

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

  route.get('', (req, res, next) => ctrl.getBuildings(req, res, next));
  route.post('', validate(buildingCreateSchema), (req, res, next) =>
    ctrl.createBuilding(req, res, next)
  );

  route.put('/:code', validate(buildingUpdateSchema), (req, res, next) =>
    ctrl.updateBuilding(req, res, next)
  );

  app.use('/buildings', route);
};
