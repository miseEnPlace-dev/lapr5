import { Router } from 'express';
import { z } from 'zod';

import { Container } from 'typedi';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import config from '@/config.mjs';
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
    height: z.number().min(1)
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
      height: z.number().min(1)
    })
    .optional()
});

export default (app: Router) => {
  const route = Router();
  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.get('', (req, res, next) => ctrl.getBuildings(req, res, next));

  route.post('', validate(buildingCreateSchema), (req, res, next) =>
    ctrl.createBuilding(req, res, next)
  );

  route.put('/:code', validate(buildingUpdateSchema), (req, res, next) =>
    ctrl.updateBuilding(req, res, next)
  );

  app.use('/buildings', route);
};
