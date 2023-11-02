import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IDeviceModelController from '@/controllers/IControllers/IDeviceModelController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

const deviceModelCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(25),
  brand: z
    .string()
    .min(1)
    .max(50),
  name: z
    .string()
    .min(1)
    .max(100),
  type: z.enum(['robot', 'drone']),
  capabilities: z.array(z.enum(['pick_delivery', 'surveillance']))
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IDeviceModelController>(TYPES.deviceModelController);

  route.post('', validate(deviceModelCreateSchema), (req, res, next) =>
    ctrl.createDeviceModel(req, res, next)
  );

  app.use(
    '/device-models',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.fleet.name),
    route
  );
};
