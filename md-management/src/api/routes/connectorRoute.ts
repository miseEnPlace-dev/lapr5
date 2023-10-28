import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';
import IConnectorController from '@/controllers/IControllers/IConnectorController';
import { TYPES, container } from '@/loaders/inversify';

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

  route.get('', (req, res, next) => ctrl.getConnectors(req, res, next));

  route.post('', validate(connectorCreateSchema), (req, res, next) =>
    ctrl.createConnector(req, res, next)
  );

  route.patch('/:code', validate(connectorUpdateSchema), (req, res, next) =>
    ctrl.updateConnector(req, res, next)
  );

  app.use('/connectors', route);
};
