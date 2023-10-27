import { Router } from 'express';
import { Container } from 'typedi';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import config from '@/config.mjs';
import IDeviceController from '@/controllers/IControllers/IDeviceController';

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

  const ctrl = Container.get(config.controllers.device.name) as IDeviceController;

  route.post('', validate(deviceCreateSchema), (req, res, next) =>
    ctrl.createDevice(req, res, next)
  );

  app.use('/devices', route);
};
