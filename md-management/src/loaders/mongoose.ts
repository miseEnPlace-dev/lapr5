import config from '@/config';
import mongoose from 'mongoose';
import Logger from './logger';

export type DbClient = typeof mongoose;

export default async function getDatabaseClient() {
  return new Promise<DbClient>((resolve, reject) => {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.databaseURL);
    const db = mongoose.connection;

    db.on('error', err => {
      Logger.error(err);
      reject(err);
    });
    db.once('open', () => {
      Logger.info('✌️ DB loaded and connected!');
      resolve(mongoose);
    });
  });
}
