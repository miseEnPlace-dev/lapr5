import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IRoomController from '@/controllers/IControllers/IRoomController';
import { TYPES, container } from '@/loaders/inversify';

const roomCreateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255),
  description: z
    .string()
    .max(255)
    .optional(),
  category: z.enum(['OFFICE', 'LAB', 'CLASSROOM', 'MEETING_ROOM']),
  dimensions: z.object({
    width: z.number().min(1),
    length: z.number().min(1)
  })
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IRoomController>(TYPES.roomController);

  route.post('/:building/floors/:floor/rooms', validate(roomCreateSchema), (req, res, next) =>
    ctrl.createRoom(req, res, next)
  );

  app.use('/buildings', route);
};
