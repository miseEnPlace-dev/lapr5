import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';
import IConnectorController from '@/controllers/IControllers/IConnectorController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { isAuthenticated, isAuthorizedAs } from '../middlewares';

const connectorCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(5),
  floor1Code: z
    .string()
    .min(1)
    .max(5),
  floor2Code: z
    .string()
    .min(1)
    .max(5)
});

const connectorUpdateSchema = z.object({
  floor1Code: z
    .string()
    .min(1)
    .max(5)
    .optional(),
  floor2Code: z
    .string()
    .min(1)
    .max(5)
    .optional()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IConnectorController>(TYPES.connectorController);

  route.get(
    '/connectors',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    (req, res, next) =>
      // #swagger.tags = ['Connectors']
      // #swagger.summary = 'Get connectors'
      // #swagger.description = 'If no query parameters are provided, all connectors are returned. If building codes are provided, only connectors between the 2 buildings are returned.'
      // #swagger.parameters['buildingCodes[]'] = { description: 'Array of 2 building codes', in: 'query', type: 'array', items: { type: 'string' }, default: ['B1', 'B2'] }
      // #swagger.responses[200] = { description: 'List of connectors' }
      // #swagger.responses[400] = { description: 'Invalid query parameters' }
      ctrl.getConnectors(req, res, next)
  );

  route.get('/connectors/:code', (req, res, next) =>
    // #swagger.tags = ['Connectors']
    // #swagger.summary = 'Get a connector'
    // #swagger.description = 'Get a connector given its code'
    // #swagger.parameters['code'] = { description: 'Connector code', in: 'path', required: true, type: 'string' }
    // #swagger.responses[200] = { description: 'The connector' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    ctrl.getConnectorByCode(req, res, next)
  );

  route.post(
    '/connectors',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(connectorCreateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Connectors']
      // #swagger.summary = 'Create a connector'
      // #swagger.description = 'Create a connector between 2 floors'
      // #swagger.parameters['connector'] = { description: 'Connector object', in: 'body', required: true }
      // #swagger.responses[200] = { description: 'The created connectors' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      ctrl.createConnector(req, res, next)
  );

  route.patch(
    '/connectors/:code',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.campus.name),
    validate(connectorUpdateSchema),
    (req, res, next) =>
      // #swagger.tags = ['Connectors']
      // #swagger.summary = 'Update a connector'
      // #swagger.description = 'Update a connector given its code'
      // #swagger.parameters['code'] = { description: 'Connector code', in: 'path', required: true, type: 'string' }
      // #swagger.parameters['connector'] = { description: 'Connector object', in: 'body', required: true }
      // #swagger.responses[200] = { description: 'The updated connector' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      ctrl.updateConnector(req, res, next)
  );

  app.use(route);
};
