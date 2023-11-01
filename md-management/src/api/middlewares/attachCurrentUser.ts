import winston from 'winston';

import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import { NextFunction, Request, Response } from 'express';
import IUserRepo from '../../services/IRepos/IUserRepo';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const Logger = container.get('logger') as winston.Logger;
  try {
    const userRepo = container.get<IUserRepo>(TYPES.userRepo);

    if (!req.token || req.token == undefined) next(new Error('Token inexistente ou inválido '));

    const id = req.token.id;

    const isFound = await userRepo.exists(id);

    if (isFound) next();
    else next(new Error('Token não corresponde a qualquer utilizador do sistema'));
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
