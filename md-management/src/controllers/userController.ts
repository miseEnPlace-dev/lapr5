import { Request, Response } from 'express';

import { Container } from 'typedi';

import config from '../../config.mjs';

import IUserRepo from '../services/IRepos/IUserRepo';

import { IUserDTO } from '../dto/IUserDTO';
import { UserMap } from '../mappers/UserMap';

export async function getMe(req: Request, res: Response) {
  // NB: a arquitetura ONION não está a ser seguida aqui

  const userRepo = Container.get(config.repos.user.name) as IUserRepo;

  if (!req.headers.token) return res.json(new Error('Token inexistente ou inválido')).status(401);

  const user = await userRepo.findById(req.headers.token.id);
  if (!user) return res.json(new Error('Utilizador não registado')).status(401);

  const userDTO = UserMap.toDTO(user) as IUserDTO;
  return res.json(userDTO).status(200);
}
