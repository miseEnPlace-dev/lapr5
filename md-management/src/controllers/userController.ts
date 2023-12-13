import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { ISessionDTO } from '@/dto/ISessionDTO';
import { IUserDTO } from '@/dto/IUserDTO';
import { TYPES } from '@/loaders/inversify/types';
import IUserService from '@/services/IServices/IUserService';
import IUserController from './IControllers/IUserController';
import { Result } from '@/core/logic/Result';

import { z } from 'zod';

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional()
});

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.userService) private userService: IUserService) {}

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;

      const role = req.query.role as string;
      const usersOrError = role
        ? await this.userService.getUsersWithRole(role)
        : await this.userService.getAllUsers(page, limit);

      if (usersOrError.isFailure)
        return res.status(400).json({ message: usersOrError.errorValue() });

      const usersDTO = usersOrError.getValue();

      return res.status(200).json(usersDTO);
    } catch (e) {
      return next(e);
    }
  }

  async getRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const requestsOrError = await this.userService.getPendingUsers();

      if (requestsOrError.isFailure)
        return res.status(400).json({ message: requestsOrError.errorValue() });

      const requestsDTO = requestsOrError.getValue();

      return res.status(200).json(requestsDTO);
    } catch (e) {
      return next(e);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userService.signUp(req.body as IUserDTO);

      if (userOrError.isFailure) return res.status(400).json({ message: userOrError.errorValue() });

      const { user, token } = userOrError.getValue();

      return res.status(201).json({ user, token });
    } catch (e) {
      return next(e);
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.activateUser(req.params.id);

      if (result.isFailure) return res.status(400).json({ message: result.errorValue() });

      return res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }

  async rejectUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.rejectUser(req.params.id);

      if (result.isFailure) return res.status(400).json({ message: result.errorValue() });

      return res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getMe(req: Request & { session: ISessionDTO }, res: Response) {
    return res.status(200).json(req.session);
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.signIn(email, password);

      if (result.isFailure) return res.status(403).json({ message: result.errorValue() });

      const { userDTO, token } = result.getValue();
      return res.status(200).json({ userDTO, token });
    } catch (e) {
      return res.status(400).json({ message: (e as { message: string }).message });
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

  async deleteUser(req: Request & { session: ISessionDTO }, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.deleteUser(req.session.id);

      if (result.isFailure) return res.status(400).json({ message: result.errorValue() });

      return res.status(204).end();
    } catch (e) {
      console.error('🔥 error %o', e);
      return next(e);
    }
  }

  async updateUser(req: Request & { session: ISessionDTO }, res: Response, next: NextFunction) {
    try {
      const result = (await this.userService.updateUser(
        req.body as IUserDTO,
        req.session.email
      )) as Result<IUserDTO>;

      if (result.isFailure) return res.status(400).json({ message: result.errorValue() });

      const userDTO = result.getValue();
      return res.status(200).json(userDTO);
    } catch (e) {
      console.error('🔥 error %o', e);
      return next(e);
    }
  }
}
