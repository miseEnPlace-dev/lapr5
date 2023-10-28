import { Service } from '@freshgum/typedi';

import IUserService from '@/services/IServices/IUserService';
import UserService from '@/services/userService';
import { Request, Response } from 'express';

@Service([UserService])
export default class UserController {
  constructor(private userService: IUserService) {}

  public async getMe(req: Request, res: Response) {
    // NB: a arquitetura ONION não está a ser seguida aqui

    if (!req.headers.token) return res.json(new Error('Token inexistente ou inválido')).status(401);

    const [id] = req.headers.token;
    const userOrError = await this.userService.getUserById(id);

    if (userOrError.isFailure) return res.json(userOrError).status(400);

    return res.json(userOrError.getValue()).status(200);
  }
}
