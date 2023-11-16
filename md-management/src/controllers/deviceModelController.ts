import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify/types';
import IDeviceModelService from '@/services/IServices/IDeviceModelService';
import IDeviceModelController from './IControllers/IDeviceModelController';

import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import { Result } from '../core/logic/Result';

@injectable()
export default class DeviceModelController implements IDeviceModelController {
  constructor(
    @inject(TYPES.deviceModelService) private deviceModelServiceInstance: IDeviceModelService
  ) {}

  public async createDeviceModel(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceModelOrError = (await this.deviceModelServiceInstance.createDeviceModel(
        req.body as IDeviceModelDTO
      )) as Result<IDeviceModelDTO>;

      if (deviceModelOrError.isFailure)
        return res.status(400).json({ message: deviceModelOrError.errorValue() });

      const deviceModelDTO = deviceModelOrError.getValue();
      return res.status(201).json(deviceModelDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getDeviceModels(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceModelsOrError = await this.deviceModelServiceInstance.getDeviceModels();

      if (deviceModelsOrError.isFailure) {
        return res.status(400).json({ message: deviceModelsOrError.errorValue() });
      }

      return res.status(200).json(deviceModelsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getDeviceModelWithCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;

      const deviceModelOrError = (await this.deviceModelServiceInstance.getDeviceModelWithCode(
        code
      )) as Result<IDeviceModelDTO>;

      if (deviceModelOrError.isFailure) {
        return res.status(400).json({ message: deviceModelOrError.errorValue() });
      }

      return res.status(200).json(deviceModelOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
