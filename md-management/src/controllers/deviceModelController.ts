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
      const deviceModelOrError = (await this.deviceModelServiceInstance.createDevice(
        req.body as IDeviceModelDTO
      )) as Result<IDeviceModelDTO>;

      if (deviceModelOrError.isFailure) return res.status(400).send();

      const deviceModelDTO = deviceModelOrError.getValue();
      return res.status(201).json(deviceModelDTO);
    } catch (e) {
      return next(e);
    }
  }
}
