import attachCurrentSession from './attachCurrentSession';
import isAuth from './isAuth';
import { validate } from './validate';

export default {
  attachCurrentUser: attachCurrentSession,
  isAuth,
  validate
};
