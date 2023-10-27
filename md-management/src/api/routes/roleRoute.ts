import { Router } from 'express';
import { z } from 'zod';

import { Container } from '@freshgum/typedi';

import RoleController from '@/controllers/roleController';

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(RoleController);

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
