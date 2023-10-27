import Container, { Service } from 'typedi';
import config from '../config.mjs';

import IRoleDTO from '../dto/IRoleDTO';
import IRoleController from './IControllers/IRoleController';

import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IRoleService from '../services/IServices/IRoleService';

@Service()
export default class RoleController implements IRoleController {
  private roleServiceInstance: IRoleService;
  constructor(roleServiceInstance?: IRoleService) {
    if (roleServiceInstance) this.roleServiceInstance = roleServiceInstance;
    else this.roleServiceInstance = Container.get(config.services.role.name) as IRoleService;
  }

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = (await this.roleServiceInstance.createRole(
        req.body as IRoleDTO
      )) as Result<IRoleDTO>;

      if (roleOrError.isFailure) return res.status(402).send();

      const roleDTO = roleOrError.getValue();
      return res.json(roleDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = (await this.roleServiceInstance.updateRole(
        req.body as IRoleDTO
      )) as Result<IRoleDTO>;

      if (roleOrError.isFailure) return res.status(404).send();

      const roleDTO = roleOrError.getValue();
      return res.status(201).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }
}
