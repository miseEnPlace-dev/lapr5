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

  route.get(
    '/device-models',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.fleet.name),
    (req, res, next) =>
      // #swagger.tags = ['DeviceModel']
      // #swagger.summary = 'Get device-model'
      // #swagger.body
      // #swagger.responses[200] = { description: 'List of device-model' }
      // #swagger.responses[400] = { description: 'Error getting the device-model' }
      ctrl.getDeviceModels(req, res, next)
  );

  route.get(
    '/device-models/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.fleet.name),
    (req, res, next) =>
      // #swagger.tags = ['DeviceModel']
      // #swagger.summary = 'Get building for given code'
      // #swagger.parameters['code'] = { description: 'Building code', in: 'path', required: true, type: 'integer' }
      // #swagger.responses[200] = { description: 'Building with this code' }
      // #swagger.responses[400] = { description: 'Error getting the building' }
      ctrl.getDeviceModelWithCode(req, res, next)
  );

  route.post(
    '/device-models',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.fleet.name),
    validate(deviceModelCreateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Device Models']
      // #swagger.summary = 'Create a device model'
      // #swagger.description = 'Create a device model given the provided device model object.'
      // #swagger.parameters['deviceModel'] = { description: 'Device model object', in: 'body', schema: { $ref: "#/definitions/DeviceModel" }, required: true }
      // #swagger.responses[200] = { description: 'The created device model' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      ctrl.createDeviceModel(req, res, next)
  );

  app.use(route);
};
