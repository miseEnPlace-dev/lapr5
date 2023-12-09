import { Router } from 'express';
import { z } from 'zod';

import IRoleController from '@/controllers/IControllers/IRoleController';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { validate } from '../middlewares';

const schema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
});
export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IRoleController>(TYPES.roleController);

  route.post('/roles', validate(schema), (req, res, next) =>
    // #swagger.tags = ['Roles']
    ctrl.createRole(req, res, next)
  );
  route.put('/roles', validate(schema), (req, res, next) =>
    // #swagger.tags = ['Roles']
    ctrl.updateRole(req, res, next)
  );
  route.get('/roles', (req, res, next) =>
    // #swagger.tags = ['Roles']
    ctrl.getRoles(req, res, next)
  );

  app.use(route);
};
