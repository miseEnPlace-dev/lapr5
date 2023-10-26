import config from '@/config.mjs';
import { Db } from 'mongodb';
import mongoose from 'mongoose';

export default async (): Promise<Db> => {
  mongoose.set('strictQuery', false);
  const connection = await mongoose.connect(config.databaseURL);
  return connection.connection.db;
};
