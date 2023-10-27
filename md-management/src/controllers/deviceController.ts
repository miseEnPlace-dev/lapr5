import { Service } from '@freshgum/typedi';

import { IDeviceDTO } from '@/dto/IDeviceDTO';
import IDeviceService from '@/services/IServices/IDeviceService';
import DeviceService from '@/services/deviceService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IDeviceController from './IControllers/IDeviceController';

@Service([DeviceService])
export default class DeviceController implements IDeviceController {
  constructor(private deviceServiceInstance: IDeviceService) {}

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
