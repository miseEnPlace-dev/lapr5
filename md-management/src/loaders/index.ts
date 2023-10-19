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
    name: config.schemas.user.name,
    schema: config.schemas.user.schema
  };

  const roleSchema = {
    name: config.schemas.role.name,
    schema: config.schemas.role.schema
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

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  };

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  };

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  };

  const buildingSchema = {
    name: config.schemas.building.name,
    schema: config.schemas.building.schema
  };

  dependencyInjectorLoader({
    schemas: [userSchema, roleSchema, buildingSchema],
    controllers: [roleController, buildingController],
    repos: [roleRepo, userRepo, buildingRepo],
    services: [roleService, buildingService]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
