import { Router } from 'express';
import { z } from 'zod';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController';
import { validate } from '../middlewares/validate';

import config from '../../../config.mjs';

const floorCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(255),
  name: z
    .string()
    .max(255)
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

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('', validate(floorCreateSchema), (req, res, next) => ctrl.createFloor(req, res, next));

  app.use('/floor', route);
};
