import { Router } from 'express';
import { z } from 'zod';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.post(
    '',
    request => {
      const schema = z.object({
        name: z
          .string()
          .min(1)
          .max(255),
      });
      return schema.parse(request.body);
    },
    (req, res, next) => ctrl.createRole(req, res, next),
  );

  route.put(
    '',
    request => {
      const schema = z.object({
        name: z
          .string()
          .min(1)
          .max(255),
      });
      return schema.parse(request.body);
    },
    (req, res, next) => ctrl.updateRole(req, res, next),
  );
};
