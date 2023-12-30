import { Router } from 'express';
import building from './routes/buildingRoute';
import connector from './routes/connectorRoute';
import deviceModel from './routes/deviceModelRoute';
import device from './routes/deviceRoute';
import elevator from './routes/elevatorRoute';
import floor from './routes/floorRoute';
import planning from './routes/planningRoute';
import role from './routes/roleRoute';
import room from './routes/roomRoute';
import request from './routes/requestRoute';
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
  device(app);
  planning(app);
  request(app);

  return app;
};
