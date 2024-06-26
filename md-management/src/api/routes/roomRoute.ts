import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IRoomController from '@/controllers/IControllers/IRoomController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

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

  route.post(
    '/buildings/:building/floors/:floor/rooms',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(roomCreateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Rooms']
      ctrl.createRoom(req, res, next)
  );

  route.get('/buildings/:building/floors/:floor/rooms', (req, res, next) =>
    // #swagger.tags = ['Rooms']
    ctrl.getFloorRooms(req, res, next)
  );

  route.get('/buildings/:building/floors/:floor/rooms/:room', (req, res, next) =>
    // #swagger.tags = ['Rooms']
    ctrl.getRoomWithName(req, res, next)
  );

  route.get('/buildings/:building/rooms', (req, res, next) =>
    // #swagger.tags = ['Rooms']
    ctrl.getBuildingRooms(req, res, next)
  );

  app.use(route);
};
