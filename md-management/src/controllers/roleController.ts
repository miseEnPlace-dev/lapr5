import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../loaders/inversify/types';
import IRoleService from '../services/IServices/IRoleService';
import IRoleController from './IControllers/IRoleController';

import { Result } from '../core/logic/Result';
import IRoleDTO from '../dto/IRoleDTO';

@injectable()
export default class RoleController implements IRoleController {
  constructor(@inject(TYPES.roleService) private roleServiceInstance: IRoleService) {}

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
