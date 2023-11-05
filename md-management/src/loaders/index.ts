import { Express } from 'express';
import Bootstrapper from './bootstrap';
import expressLoader from './express';
import { container } from './inversify';
import { TYPES } from './inversify/types';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: { expressApp: Express }) => {
  await mongooseLoader();

  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  const bootstrapper = container.get<Bootstrapper>(TYPES.bootstrapper);
  await bootstrapper.bootstrap();
  Logger.info('✌️ Bootstrapper loaded');
};
