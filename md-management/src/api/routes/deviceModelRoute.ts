import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IDeviceModelController from '@/controllers/IControllers/IDeviceModelController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

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

  route.post('/device-models', validate(deviceModelCreateSchema), (req, res, next) =>
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
