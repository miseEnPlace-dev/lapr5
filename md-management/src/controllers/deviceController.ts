import config from '@/config.mjs';
import Container, { Service } from 'typedi';

import IDeviceService from '@/services/IServices/IDeviceService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IDeviceController from './IControllers/IDeviceController';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

@Service()
export default class DeviceController implements IDeviceController {
  private deviceServiceInstance: IDeviceService;
  constructor() {
    this.deviceServiceInstance = Container.get(config.services.device.name) as IDeviceService;
  }

  public async createDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = (await this.deviceServiceInstance.createDevice(
        req.body as IDeviceDTO
      )) as Result<IDeviceDTO>;

      if (deviceOrError.isFailure) return res.status(400).send();

      const deviceDTO = deviceOrError.getValue();
      return res.json(deviceDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async inhibitDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = (await this.deviceServiceInstance.inhibitDevice(
        req.params.code
      )) as Result<IDeviceDTO>;

      if (deviceOrError.isFailure) return res.status(400).send();

      const deviceDTO = deviceOrError.getValue();
      return res.json(deviceDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
