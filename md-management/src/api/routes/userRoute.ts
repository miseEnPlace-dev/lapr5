import { Router } from 'express';

import { z } from 'zod';

import { container } from '@/loaders/inversify';

import IUserController from '@/controllers/IControllers/IUserController';
import { TYPES } from '@/loaders/inversify/types';
import { attachCurrentSession, isAuthenticated, validate } from '../middlewares/';

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(255),
  lastName: z
    .string()
    .min(1)
    .max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(255),
  role: z
    .string()
    .min(1)
    .max(255),
  phoneNumber: z.string().min(1)
});

const signInSchema = z.object({
  email: z
    .string()
    .min(1)
    .max(255),
  password: z
    .string()
    .min(1)
    .max(255)
});

export default (app: Router) => {
  const route = Router();
  const userController = container.get<IUserController>(TYPES.userController);

  route.post('/signup', validate(signUpSchema), (req, res, next) =>
    userController.signUp(req, res, next)
  );

  route.post('/login', validate(signInSchema), (req, res, next) =>
    userController.signIn(req, res, next)
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
  route.post('/logout', isAuthenticated, (req, res, next) =>
    userController.signOut(req, res, next)
  );

  app.use('/users', route);

  route.get('/me', isAuthenticated, attachCurrentSession, (req, res) =>
    userController.getMe(req, res)
  );
};
