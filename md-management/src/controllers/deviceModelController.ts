import config from '@/config.mjs';
import Container, { Service } from 'typedi';

import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import IDeviceModelService from '@/services/IServices/IDeviceModelService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IDeviceModelController from './IControllers/IDeviceModelController';

@Service()
export default class DeviceModelController implements IDeviceModelController {
  private deviceModelServiceInstance: IDeviceModelService;
  constructor() {
    this.deviceModelServiceInstance = Container.get(
      config.services.deviceModel.name
    ) as IDeviceModelService;
  }

  public async createDeviceModel(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceModelOrError = (await this.deviceModelServiceInstance.createDevice(
        req.body as IDeviceModelDTO
      )) as Result<IDeviceModelDTO>;

      if (deviceModelOrError.isFailure) return res.status(400).send();

      const deviceModelDTO = deviceModelOrError.getValue();
      return res.json(deviceModelDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
