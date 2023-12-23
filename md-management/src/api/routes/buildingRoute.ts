import { Router } from 'express';
import { z } from 'zod';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs, validate } from '../middlewares';

const buildingCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(5),
  name: z
    .string()
    .max(50)
    .optional(),
  description: z
    .string()
    .max(255)
    .optional(),
  maxDimensions: z.object({
    width: z.number().min(1),
    length: z.number().min(1)
  })
});

const buildingUpdateSchema = z.object({
  name: z
    .string()
    .max(50)
    .optional(),
  description: z
    .string()
    .max(255)
    .optional(),
  maxDimensions: z
    .object({
      width: z.number().min(1),
      length: z.number().min(1)
    })
    .optional()
});

export default (app: Router) => {
  const route = Router();
  const ctrl = container.get<IBuildingController>(TYPES.buildingController);

  route.get(
    '/buildings',
    isAuthenticated,
    (req, res, next) =>
      isAuthorizedAs(req, res, next, [defaultRoles.campus.name, defaultRoles.user.name]),
    (req, res, next) =>
      // #swagger.tags = ['Buildings']
      // #swagger.summary = 'Get buildings'
      // #swagger.body
      // #swagger.description = 'If no query parameters are provided, all buildings are returned. If building codes are provided, only buildings with no. of floors between the provided min & max query params are returned.'
      // #swagger.parameters['minFloors'] = { description: 'Minimum number of floors in the buildings', in: 'query', type: 'integer' }
      // #swagger.parameters['maxFloors'] = { description: 'Maximum number of floors in the buildings', in: 'query', type: 'integer' }
      // #swagger.responses[200] = { description: 'List of buildings' }
      // #swagger.responses[400] = { description: 'Error getting the buildings' }

      ctrl.getBuildings(req, res, next)
  );

  route.get(
    '/buildings/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    (req, res, next) =>
      // #swagger.tags = ['Buildings']
      // #swagger.summary = 'Get building for given code'
      // #swagger.parameters['code'] = { description: 'Building code', in: 'path', required: true, type: 'integer' }
      // #swagger.responses[200] = { description: 'Building with this code' }
      // #swagger.responses[400] = { description: 'Error getting the building' }
      ctrl.getBuildingWithCode(req, res, next)
  );

  route.post(
    '/buildings',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(buildingCreateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Buildings']
      // #swagger.summary = 'Create a building'
      // #swagger.description = 'Create a building'
      // #swagger.parameters['building'] = { description: 'Building object', in: 'body', schema: { $ref: "#/definitions/Building" }, required: true }
      // #swagger.responses[200] = { description: 'The created building' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      ctrl.createBuilding(req, res, next)
  );

  route.put(
    '/buildings/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(buildingUpdateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Buildings']
      // #swagger.summary = 'Update a building'
      // #swagger.description = 'Update a building given its code'
      // #swagger.parameters['code'] = { description: 'Building code', in: 'path', required: true, type: 'string' }
      // #swagger.parameters['building'] = { description: 'Building object', in: 'body', schema: { $ref: "#/definitions/Building" }, required: true }
      // #swagger.responses[200] = { description: 'The updated building' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      ctrl.updateBuilding(req, res, next)
  );

  app.use(route);
};
