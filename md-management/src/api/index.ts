import { Router } from 'express';
import building from './routes/buildingRoute';
import elevator from './routes/elevatorRoute';
import floor from './routes/floorRoute';
import role from './routes/roleRoute';
import { default as auth, default as user } from './routes/userRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  building(app);
  floor(app);
  elevator(app);

  return app;
};
