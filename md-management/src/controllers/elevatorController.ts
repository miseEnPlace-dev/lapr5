import config from '@/config.mjs';
import Container, { Service } from 'typedi';

import { IElevatorDTO } from '@/dto/IElevatorDTO';
import IElevatorService from '@/services/IServices/IElevatorService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IElevatorController from './IControllers/IElevatorController';

@Service()
export default class ElevatorController implements IElevatorController {
  private elevatorServiceInstance: IElevatorService;
  constructor() {
    this.elevatorServiceInstance = Container.get(config.services.elevator.name) as IElevatorService;
  }

  public async getElevatorForBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.getElevatorForBuilding(
        req.params.building as string
      )) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure)
        return res.status(400).send({ error: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.json(roleDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    const buildingCode = req.params.building as string;
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.createElevator({
        ...req.body,
        buildingCode
      } as IElevatorDTO)) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure)
        return res.status(400).send({ error: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.json(roleDTO).status(201);
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
        return res.status(400).send({ error: elevatorOrError.errorValue() });

      const roleDTO = elevatorOrError.getValue();
      return res.json(roleDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
