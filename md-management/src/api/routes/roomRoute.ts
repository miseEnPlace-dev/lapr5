import { Router } from 'express';
import { z } from 'zod';
import { Container } from 'typedi';

import IRoomController from '@/controllers/IControllers/IRoomController';
import { validate } from '@/api/middlewares/validate';

import config from '@/config.mjs';

const roomCreateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255),
  description: z
    .string()
    .max(255)
    .optional(),
  dimensions: z.object({
    width: z.number().min(1),
    height: z.number().min(1)
  })
});

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post('', validate(roomCreateSchema), (req, res, next) => ctrl.createRoom(req, res, next));

  app.use('/rooms', route);
};
