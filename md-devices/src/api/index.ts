import { Router } from 'express';
import building from './routes/buildingRoute';
import role from './routes/roleRoute';
import { default as auth, default as user } from './routes/userRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  building(app);

  return app;
};
