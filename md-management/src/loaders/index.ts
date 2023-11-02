import { Express } from 'express';
import Bootstrapper from './bootstrap';
import expressLoader from './express';
import { container } from './inversify';
import { TYPES } from './inversify/types';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: { expressApp: Express }) => {
  try {
    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');
  } catch (err) {
    Logger.error(err);
  }

  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });

  const bootstrapper = container.get<Bootstrapper>(TYPES.bootstrapper);
  await bootstrapper.bootstrap();

  Logger.info('✌️ Express loaded');
};
