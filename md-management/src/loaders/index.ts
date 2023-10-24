import { Express } from 'express';
import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';

import config from '@/config.mjs';

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

  const connectorController = {
    name: config.controllers.connector.name,
    path: config.controllers.connector.path
  };

  const connectorRepo = {
    name: config.repos.connector.name,
    path: config.repos.connector.path
  };

  const connectorService = {
    name: config.services.connector.name,
    path: config.services.connector.path
  };

  const connectorSchema = {
    name: config.schemas.connector.name,
    schema: config.schemas.connector.schema
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

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  };

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  };

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  };

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  };

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  };

  const roomSchema = {
    name: config.schemas.room.name,
    schema: config.schemas.room.schema
  };

  dependencyInjectorLoader({
    schemas: [userSchema, roleSchema, buildingSchema, floorSchema, roomSchema, connectorSchema],
    controllers: [
      roleController,
      buildingController,
      floorController,
      elevatorController,
      roomController,
      connectorController
    ],
    repos: [roleRepo, userRepo, buildingRepo, floorRepo, roomRepo, connectorRepo],
    services: [
      roleService,
      buildingService,
      floorService,
      elevatorService,
      roomService,
      connectorService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
