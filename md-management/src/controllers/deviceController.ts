import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify';
import IDeviceService from '@/services/IServices/IDeviceService';
import IDeviceController from './IControllers/IDeviceController';

import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { Result } from '../core/logic/Result';

@injectable()
export default class DeviceController implements IDeviceController {
  constructor(@inject(TYPES.deviceService) private deviceServiceInstance: IDeviceService) {}

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

  public async getDevicesRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const devicesOrError = (await this.deviceServiceInstance.getDevicesRobots()) as Result<
        IDeviceDTO[]
      >;

      if (devicesOrError.isFailure) return res.status(400).send();

      const devicesDTO = devicesOrError.getValue();
      return res.json(devicesDTO).status(200);
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
