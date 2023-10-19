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

  const floorSchema = {
    name: config.schemas.floor.name,
    schema: config.schemas.floor.schema
  };

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  };

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  };

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  };

  dependencyInjectorLoader({
    schemas: [userSchema, roleSchema, buildingSchema, floorSchema],
    controllers: [roleController, buildingController, floorController],
    repos: [roleRepo, userRepo, buildingRepo, floorRepo],
    services: [roleService, buildingService, floorService]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
