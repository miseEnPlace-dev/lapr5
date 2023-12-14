import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IFloorController from '@/controllers/IControllers/IFloorController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

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

  route.get(
    '/buildings/:building/floors',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      ctrl.getFloors(req, res, next)
  );
  route.get(
    '/buildings/:building/floors/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      ctrl.getFloorWithCode(req, res, next)
  );
  route.post(
    '/buildings/:building/floors',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(floorCreateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      ctrl.createFloor(req, res, next)
  );
  route.patch(
    '/buildings/:building/floors/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      // #swagger.summary = 'Upload floor map'
      ctrl.uploadMap(req, res, next)
  );
  route.put(
    '/buildings/:building/floors/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(floorUpdateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      ctrl.updateFloor(req, res, next)
  );

  const allowedRoles = [defaultRoles.campus.name, defaultRoles.task.name, defaultRoles.fleet.name];

  route.get(
    '/floors',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, allowedRoles),
    (req, res, next) =>
      // #swagger.tags = ['Floors']
      ctrl.getAllFloors(req, res, next)
  );

  app.use(route);
};
