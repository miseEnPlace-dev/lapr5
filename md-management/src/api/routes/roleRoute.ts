import { Router } from 'express';
import { z } from 'zod';

import IRoleController from '@/controllers/IControllers/IRoleController';
import { TYPES, container } from '@/loaders/inversify';

export default (app: Router) => {
  const route = Router();

  const ctrl = container.get<IRoleController>(TYPES.roleController);

  route.post(
    '',
    request => {
      const schema = z.object({
        name: z
          .string()
          .min(1)
          .max(255)
      });
      return schema.parse(request.body);
    },
    (req, res, next) => ctrl.createRole(req, res, next)
  );

  route.put(
    '',
    request => {
      const schema = z.object({
        name: z
          .string()
          .min(1)
          .max(255)
      });
      return schema.parse(request.body);
    },
    (req, res, next) => ctrl.updateRole(req, res, next)
  );

  app.use('/roles', route);
};
