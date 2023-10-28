import { Service } from '@freshgum/typedi';

import IUserRepo from '../services/IRepos/IUserRepo';

import UserRepo from '@/repos/userRepo';
import { Request, Response } from 'express';
import { IUserDTO } from '../dto/IUserDTO';
import { UserMapper } from '../mappers/UserMapper';

@Service([UserRepo])
export default class UserController {
  constructor(private userRepo: IUserRepo) {}

  public async getMe(req: Request, res: Response) {
    // NB: a arquitetura ONION não está a ser seguida aqui

    if (!req.headers.token) return res.json(new Error('Token inexistente ou inválido')).status(401);

    const user = await this.userRepo.findById(req.headers.token.id);
    if (!user) return res.json(new Error('Utilizador não registado')).status(401);

    const userDTO = UserMapper.toDTO(user) as IUserDTO;
    return res.json(userDTO).status(200);
  }
}
