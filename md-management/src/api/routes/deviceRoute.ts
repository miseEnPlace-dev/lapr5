import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import IDeviceController from '@/controllers/IControllers/IDeviceController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

const deviceCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(30),
  nickname: z
    .string()
    .min(1)
    .max(30),
  modelCode: z
    .string()
    .min(1)
    .max(50),
  description: z
    .string()
    .min(1)
    .max(255)
    .optional(),
  serialNumber: z
    .string()
    .min(1)
    .max(50)
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IDeviceController>(TYPES.deviceController);

  route.post('/devices', validate(deviceCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Devices']
    ctrl.createDevice(req, res, next)
  );
  route.patch('/devices/:code', (req, res, next) =>
    // #swagger.tags = ['Devices']
    // #swagger.summary = 'Inhibit a device'
    ctrl.inhibitDevice(req, res, next)
  );

  route.get('/devices/robots', (req, res, next) =>
    // #swagger.tags = ['Devices']
    // #swagger.summary = 'Get all robots'
    ctrl.getDevicesRobots(req, res, next)
  );

  route.get('/devices/robots/:deviceCode', (req, res, next) =>
    // #swagger.tags = ['Devices']
    // #swagger.summary = 'Get a robot'
    ctrl.getDeviceRobot(req, res, next)
  );

  app.use(route);
};
