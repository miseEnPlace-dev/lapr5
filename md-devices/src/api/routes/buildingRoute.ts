import { Router } from 'express';
import { z } from 'zod';

import { Container } from 'typedi';

import IBuildingController from '@/controllers/IControllers/IBuildingController';
import config from '../../../config.mjs';

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post(
    '',
    request => {
      const schema = z.object({
        code: z
          .string()
          .min(1)
          .max(5),
        name: z.string().min(1),
        description: z
          .string()
          .min(1)
          .max(255)
          .optional(),
        maxDimensions: z.object({
          width: z.number().min(1),
          height: z.number().min(1)
        })
      });
      return schema.parse(request.body);
    },
    (req, res, next) => ctrl.createBuilding(req, res, next)
  );

  app.use('/buildings', route);
};
