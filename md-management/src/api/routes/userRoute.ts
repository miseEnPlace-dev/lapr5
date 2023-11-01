import { NextFunction, Request, Response, Router } from 'express';

import { Logger } from 'winston';
import { z } from 'zod';

import { container } from '@/loaders/inversify';
import middlewares from '../middlewares';

import IUserController from '@/controllers/IControllers/IUserController';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
import { IUserDTO } from '../../dto/IUserDTO';

export default (app: Router) => {
  const route = Router();
  const userController = container.get<IUserController>(TYPES.userController);

  route.post(
    '/signup',
    request => {
      const schema = z.object({
        firstName: z
          .string()
          .min(1)
          .max(255),
        lastName: z
          .string()
          .min(1)
          .max(255),
        email: z
          .string()
          .min(1)
          .max(255),
        password: z
          .string()
          .min(1)
          .max(255),
        role: z
          .string()
          .min(1)
          .max(255)
      });
      return schema.parse(request.body);
    },
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = container.get<IUserService>(TYPES.userService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) return res.status(401).send(userOrError.errorValue());

        const { userDTO, token } = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.post(
    '/signin',
    request => {
      const schema = z.object({
        email: z
          .string()
          .min(1)
          .max(255),
        password: z
          .string()
          .min(1)
          .max(255)
      });
      return schema.parse(request.body);
    },
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const authServiceInstance = container.get<IUserService>(TYPES.userService);
        const result = await authServiceInstance.SignIn(email, password);

        if (result.isFailure) return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);
      } catch (e) {
        return next(e);
      }
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = container.get<Logger>(TYPES.logger);

    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) =>
    userController.getMe(req, res)
  );
};
