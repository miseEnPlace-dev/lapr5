import { Router } from 'express';
import { Container } from 'typedi';

import config from '@/config.mjs';
import IConnectorController from '@/controllers/IControllers/IConnectorController';

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.connector.name) as IConnectorController;

  // route.get('', (req, res, next) => ctrl.getConnector(req, res, next));
  route.post('', (req, res, next) => ctrl.createConnector(req, res, next));

  app.use('/connectors', route);
};
