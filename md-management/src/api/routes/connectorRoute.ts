import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';
import IConnectorController from '@/controllers/IControllers/IConnectorController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';

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

  route.get('/connectors', (req, res, next) =>
    // #swagger.tags = ['Connectors']
    ctrl.getConnectors(req, res, next)
  );

  route.post('/connectors', validate(connectorCreateSchema), (req, res, next) =>
    // #swagger.tags = ['Connectors']
    ctrl.createConnector(req, res, next)
  );

  route.patch('/connectors/:code', validate(connectorUpdateSchema), (req, res, next) =>
    // #swagger.tags = ['Connectors']
    ctrl.updateConnector(req, res, next)
  );

  app.use(route);
};
