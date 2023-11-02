// remove by JRT : import jwt from 'express-jwt';
import config from '@/config.mjs';
import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = (req: Request) => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuthenticated = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  requestProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
  algorithms: ['HS256'] // Added by JRT
});

export default isAuthenticated;
