import { Container } from '@freshgum/typedi';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import DeviceController from '@/controllers/deviceController';

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

  const ctrl = Container.get(DeviceController);

  route.post('', validate(deviceCreateSchema), (req, res, next) =>
    ctrl.createDevice(req, res, next)
  );
  route.patch('/:code', (req, res, next) => ctrl.inhibitDevice(req, res, next));

  route.patch('/:code', (req, res, next) => ctrl.inhibitDevice(req, res, next));

  app.use('/devices', route);
};
