import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IFloorController from '@/controllers/IControllers/IFloorController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

const floorCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(255),
  description: z
    .string()
    .max(255)
    .optional(),
  dimensions: z.object({
    width: z.number().min(1),
    length: z.number().min(1)
  })
});

const floorUpdateSchema = z.object({
  description: z
    .string()
    .max(255)
    .optional(),
  dimensions: z
    .object({
      width: z.number().min(1),
      length: z.number().min(1)
    })
    .optional()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IFloorController>(TYPES.floorController);

  route.get('/buildings/:building/floors', (req, res, next) =>
    // #swagger.tags = ['Floors']
    ctrl.getFloors(req, res, next)
  );
  route.post('/buildings/:building/floors', validate(floorCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Floors']
    ctrl.createFloor(req, res, next)
  );
  route.patch('/buildings/floors/:code', (req, res, next) =>
    // #swagger.tags = ['Floors']
    // #swagger.summary = 'Upload floor map'
    ctrl.uploadMap(req, res, next)
  );
  route.put('/buildings/:building/floors/:code', validate(floorUpdateSchema), (req, res, next) =>
    // #swagger.tags = ['Floors']
    ctrl.updateFloor(req, res, next)
  );

  app.use(route);
};
