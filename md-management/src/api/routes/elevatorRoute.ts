import { Router } from 'express';
import { z } from 'zod';

import IElevatorController from '@/controllers/IControllers/IElevatorController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { validate } from '../middlewares/validate';

const elevatorCreateSchema = z.object({
  code: z.number().min(1),
  floorCodes: z.array(z.string()),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  description: z.string().optional()
});

const elevatorUpdateSchema = z.object({
  code: z
    .number()
    .min(1)
    .optional(),
  floorCodes: z.array(z.string()).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  description: z.string().optional()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IElevatorController>(TYPES.elevatorController);

  route.get('/buildings/:building/elevators', (req, res, next) =>
    // #swagger.tags = ['Elevators']
    ctrl.getElevatorForBuilding(req, res, next)
  );
  route.post('/buildings/:building/elevators', validate(elevatorCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Elevators']
    ctrl.createElevator(req, res, next)
  );
  route.put('/buildings/:building/elevators', validate(elevatorUpdateSchema), (req, res, next) =>
    // #swagger.tags = ['Elevators']
    ctrl.editElevator(req, res, next)
  );

  app.use(route);
};
