import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify/types';
import IDeviceService from '@/services/IServices/IDeviceService';
import IDeviceController from './IControllers/IDeviceController';

import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { z } from 'zod';
import { Result } from '../core/logic/Result';

@injectable()
export default class DeviceController implements IDeviceController {
  constructor(@inject(TYPES.deviceService) private deviceServiceInstance: IDeviceService) {}

  public async createDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = (await this.deviceServiceInstance.createDevice(
        req.body as IDeviceDTO
      )) as Result<IDeviceDTO>;

      if (deviceOrError.isFailure)
        return res.status(400).json({ message: deviceOrError.errorValue() });

      const deviceDTO = deviceOrError.getValue();
      return res.status(201).json(deviceDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getDevicesRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const filterSchema = z.object({ filter: z.string().optional() });
      const filter = filterSchema.safeParse(req.query);
      if (!filter.success) return res.status(400).json({ errors: filter.error });

      const valueSchema = z.object({ value: z.string().optional() });
      const value = valueSchema.safeParse(req.query);
      if (!value.success) return res.status(400).json({ errors: value.error });

      const devicesOrError = (await this.deviceServiceInstance.getDevicesRobots(
        filter.data.filter,
        value.data.value
      )) as Result<IDeviceDTO[]>;

      if (devicesOrError.isFailure)
        return res.status(400).json({ message: devicesOrError.errorValue() });

      const devicesDTO = devicesOrError.getValue();
      return res.status(200).json(devicesDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async inhibitDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = (await this.deviceServiceInstance.inhibitDevice(
        req.params.code
      )) as Result<IDeviceDTO>;

      if (deviceOrError.isFailure)
        return res.status(400).json({ message: deviceOrError.errorValue() });

      const deviceDTO = deviceOrError.getValue();
      return res.status(200).json(deviceDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getDeviceRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = (await this.deviceServiceInstance.getDeviceRobotWithCode(
        req.params.deviceCode
      )) as Result<IDeviceDTO>;

      if (deviceOrError.isFailure)
        return res.status(400).json({ message: deviceOrError.errorValue() });

      const deviceDTO = deviceOrError.getValue();
      return res.status(200).json(deviceDTO);
    } catch (e) {
      return next(e);
    }
  }
}
