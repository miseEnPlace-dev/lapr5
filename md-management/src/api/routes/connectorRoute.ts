import { Container } from '@freshgum/typedi';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';
import ConnectorController from '@/controllers/connectorController';

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

  const ctrl = Container.get(ConnectorController);

  route.get('', (req, res, next) => ctrl.getConnectors(req, res, next));

  route.post('', validate(connectorCreateSchema), (req, res, next) =>
    ctrl.createConnector(req, res, next)
  );

  route.patch('/:code', validate(connectorUpdateSchema), (req, res, next) =>
    ctrl.updateConnector(req, res, next)
  );

  app.use('/connectors', route);
};
