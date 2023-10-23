import { Router } from 'express';
import { z } from 'zod';

import { Container } from 'typedi';

import config from '@/config.mjs';
import IElevatorController from '@/controllers/IControllers/IElevatorController';
import { validate } from '../middlewares/validate';

const elevatorCreateSchema = z.object({
  code: z.number().min(1),
  floorCodes: z.array(z.string()),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  description: z.string().optional()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.get('/:id', (req, res, next) => ctrl.getElevator(req, res, next));
  route.post('', validate(elevatorCreateSchema), (req, res, next) =>
    ctrl.createElevator(req, res, next)
  );

  app.use('/elevators', route);
};
