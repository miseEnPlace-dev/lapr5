import { Router } from 'express';

import { z } from 'zod';

import { container } from '@/loaders/inversify';

import IUserController from '@/controllers/IControllers/IUserController';
import { defaultRoles } from '@/domain/role/defaultRoles';
import { TYPES } from '@/loaders/inversify/types';
import { attachCurrentSession, isAuthenticated, isAuthorizedAs, validate } from '../middlewares/';

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

  route.post('/users/signup', validate(signUpSchema), (req, res, next) =>
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Sign up'
    // #swagger.description = 'Sign up a new user'
    // #swagger.parameters['user'] = { description: 'User object', in: 'body', required: true }
    // #swagger.responses[200] = { description: 'The created user' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    userController.signUp(req, res, next)
  );

  route.patch(
    '/users/:id',
    isAuthenticated,
    (req, res, next) => isAuthorizedAs(req, res, next, defaultRoles.admin.name),
    (req, res, next) =>
      // #swagger.tags = ['Users']
      // #swagger.summary = 'Activate user'
      // #swagger.description = 'Activate a user'
      // #swagger.parameters['id'] = { description: 'User id', in: 'path', required: true }
      // #swagger.responses[200] = { description: 'The activated user' }
      // #swagger.responses[400] = { description: 'Invalid input' }
      userController.activateUser(req, res, next)
  );

  route.delete('/users', isAuthenticated, attachCurrentSession, (req, res, next) =>
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete user'
    // #swagger.description = 'Delete a user'
    // #swagger.parameters['id'] = { description: 'User id', in: 'path', required: true }
    // #swagger.responses[200] = { description: 'The deleted user' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    userController.deleteUser(req, res, next)
  );

  route.post('/users/login', validate(signInSchema), (req, res, next) =>
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Sign in'
    // #swagger.description = 'Sign in a user'
    // #swagger.parameters['user'] = { description: 'User login credentials', in: 'body', required: true }
    // #swagger.responses[200] = { description: 'The logged user' }
    // #swagger.responses[400] = { description: 'Invalid input' }
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
  route.post('/users/logout', isAuthenticated, (req, res, next) =>
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Sign out'
    // #swagger.description = 'Sign out a user'
    // #swagger.responses[200] = { description: 'The logged user' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    userController.signOut(req, res, next)
  );

  app.use(route);

  route.get('/me', isAuthenticated, attachCurrentSession, (req, res) =>
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get current logged user'
    // #swagger.description = 'Get current logged user session details given a valid jwt token'
    // #swagger.parameters['Authorization'] = { description: 'JWT token', in: 'header', required: true }
    // #swagger.responses[200] = { description: 'The logged user' }
    // #swagger.responses[400] = { description: 'Invalid input' }
    userController.getMe(req, res)
  );
};
