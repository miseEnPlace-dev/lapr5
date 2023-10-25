import { Router } from 'express';
import { Container } from 'typedi';
import { z } from 'zod';

import config from '@/config.mjs';
import IConnectorController from '@/controllers/IControllers/IConnectorController';
import { validate } from '@/api/middlewares/validate';

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
  code: z
    .string()
    .min(1)
    .max(5),
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

  const ctrl = Container.get(config.controllers.connector.name) as IConnectorController;

  route.get('', (req, res, next) => ctrl.getConnectorsBetweenBuildings(req, res, next));

  route.post('', validate(connectorCreateSchema), (req, res, next) =>
    ctrl.createConnector(req, res, next)
  );

  route.patch('/:id', validate(connectorUpdateSchema), (req, res, next) =>
    ctrl.updateConnector(req, res, next)
  );

  app.use('/connectors', route);
};
