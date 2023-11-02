import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

import { IUserDTO } from '@/dto/IUserDTO';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
import IUserController from './IControllers/IUserController';

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.userService) private userService: IUserService) {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userService.signUp(req.body as IUserDTO);

      if (userOrError.isFailure) return res.status(401).json({ message: userOrError.errorValue() });

      const { userDTO, token } = userOrError.getValue();

      return res.status(201).json({ userDTO, token });
    } catch (e) {
      // logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.token)
        return res.status(401).json(new Error('Token inexistente ou inválido'));

      const [id] = req.headers.token;
      const userOrError = await this.userService.getUserById(id);

      if (userOrError.isFailure) return res.status(400).json(userOrError);

      return res.status(200).json(userOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.SignIn(email, password);

      if (result.isFailure) return res.status(403).json({ message: result.errorValue() });

      const { userDTO, token } = result.getValue();
      return res.status(200).json({ userDTO, token });
    } catch (e) {
      return next(e);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    const logger = container.get<Logger>(TYPES.logger);

    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  }
}
