import { Container } from '@freshgum/typedi';
import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import FloorController from '@/controllers/floorController';

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

  const ctrl = Container.get(FloorController);

  route.get('/:building/floors', (req, res, next) => ctrl.getFloors(req, res, next));
  route.post('/:building/floors', validate(floorCreateSchema), (req, res, next) =>
    ctrl.createFloor(req, res, next)
  );
  route.patch('/floors/:code', multer().single('file'), (req, res, next) =>
    ctrl.uploadMap(req, res, next)
  );
  route.put('/:building/floors/:code', validate(floorUpdateSchema), (req, res, next) =>
    ctrl.updateFloor(req, res, next)
  );

  app.use('/buildings', route);
};
