import { Router } from 'express';
import building from './routes/buildingRoute';
import connector from './routes/connectorRoute';
import deviceModel from './routes/deviceModelRoute';
import elevator from './routes/elevatorRoute';
import floor from './routes/floorRoute';
import role from './routes/roleRoute';
import room from './routes/roomRoute';
import { default as auth, default as user } from './routes/userRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  building(app);
  connector(app);
  floor(app);
  elevator(app);
  room(app);
  deviceModel(app);

  return app;
};
