import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify/types';
import IElevatorService from '@/services/IServices/IElevatorService';
import IElevatorController from './IControllers/IElevatorController';

import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { Result } from '../core/logic/Result';

@injectable()
export default class ElevatorController implements IElevatorController {
  constructor(@inject(TYPES.elevatorService) private elevatorServiceInstance: IElevatorService) {}

  public async getElevatorForBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.getElevatorForBuilding(
        req.params.building as string
      )) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure)
        return res.status(400).json({ message: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.status(200).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    const buildingCode = req.params.building as string;
    try {
      const elevatorOrError = await this.elevatorServiceInstance.createElevator({
        ...req.body,
        buildingCode
      } as IElevatorDTO);

      if (elevatorOrError.isFailure)
        return res.status(400).json({ message: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.status(201).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async editElevator(req: Request, res: Response, next: NextFunction) {
    const buildingCode = req.params.building as string;
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.editElevator({
        ...req.body,
        buildingCode
      } as IElevatorDTO)) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure)
        return res.status(400).json({ message: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.status(200).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }
}
