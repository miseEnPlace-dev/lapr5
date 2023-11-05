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
    // #swagger.summary = 'Get elevators for a building'
    // #swagger.description = 'Get all the elevators in a building. For now, all buildings only have 1 elevator, so the response will be an array of 1 element.'
    // #swagger.parameters['building'] = { description: 'Building code', in: 'path', required: true }
    // #swagger.responses[200] = { description: 'List of elevators' }
    // #swagger.responses[400] = { description: 'Error getting the elevators' }
    ctrl.getElevatorForBuilding(req, res, next)
  );
  route.post('/buildings/:building/elevators', validate(elevatorCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Elevators']
    // #swagger.summary = 'Create an elevator'
    // #swagger.description = 'Create an elevator for a given building'
    // #swagger.parameters['building'] = { description: 'Building code', in: 'path', required: true }
    // #swagger.parameters['elevator'] = { description: 'Elevator object', in: 'body', schema: { $ref: "#/definitions/Elevator" }, required: true }
    // #swagger.responses[200] = { description: 'The created elevator' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    ctrl.createElevator(req, res, next)
  );
  route.put('/buildings/:building/elevators', validate(elevatorUpdateSchema), (req, res, next) =>
    // #swagger.tags = ['Elevators']
    // #swagger.summary = 'Edit an elevator'
    // #swagger.description = 'Edit an elevator for a given building'
    // #swagger.parameters['building'] = { description: 'Building code', in: 'path', required: true }
    // #swagger.parameters['elevator'] = { description: 'Elevator object', in: 'body', schema: { $ref: "#/definitions/Elevator" }, required: true }
    // #swagger.responses[200] = { description: 'The edited elevator' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    ctrl.editElevator(req, res, next)
  );

  app.use(route);
};
