import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { ISessionDTO } from '@/dto/ISessionDTO';
import { IUserDTO } from '@/dto/IUserDTO';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
import IUserController from './IControllers/IUserController';

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.userService) private userService: IUserService) {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userService.signUp(req.body as IUserDTO);

      if (userOrError.isFailure) return res.status(400).json({ message: userOrError.errorValue() });

      const { userDTO, token } = userOrError.getValue();

      return res.status(201).json({ userDTO, token });
    } catch (e) {
      return next(e);
    }
  }

  public async getMe(req: Request & { session: ISessionDTO }, res: Response) {
    return res.status(200).json(req.session);
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.signIn(email, password);

      if (result.isFailure) return res.status(403).json({ message: result.errorValue() });

      const { userDTO, token } = result.getValue();
      return res.status(200).json({ userDTO, token });
    } catch (e) {
      return next(e);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      console.error('🔥 error %o', e);
      return next(e);
    }
  }
}
