import { Express } from 'express';
import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';

import config from '../../config.mjs';

export default async ({ expressApp }: { expressApp: Express }) => {
  try {
    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');
  } catch (err) {
    Logger.error(err);
  }

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema'
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema'
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  };

  dependencyInjectorLoader({
    schemas: [userSchema, roleSchema],
    controllers: [roleController],
    repos: [roleRepo, userRepo],
    services: [roleService]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
