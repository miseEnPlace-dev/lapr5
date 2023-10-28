import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify';
import IUserService from '@/services/IServices/IUserService';
import IUserController from './IControllers/IUserController';

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.userService) private userService: IUserService) {}

  public async getMe(req: Request, res: Response) {
    // NB: a arquitetura ONION não está a ser seguida aqui

    if (!req.headers.token) return res.json(new Error('Token inexistente ou inválido')).status(401);

    const [id] = req.headers.token;
    const userOrError = await this.userService.getUserById(id);

    if (userOrError.isFailure) return res.json(userOrError).status(400);

    return res.json(userOrError.getValue()).status(200);
  }
}
