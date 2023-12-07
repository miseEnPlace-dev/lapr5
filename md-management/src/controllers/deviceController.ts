import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/loaders/inversify/types';
import IDeviceService from '@/services/IServices/IDeviceService';
import IDeviceController from './IControllers/IDeviceController';

import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { z } from 'zod';
import { Result } from '../core/logic/Result';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

const querySchema = z.object({
  filter: z.string().optional(),
  value: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
});

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
      const query = querySchema.safeParse(req.query);
      if (!query.success) return res.status(400).json({ message: query.error });

      const filter = query.data.filter || undefined;
      const value = query.data.value || undefined;
      const page = Number(query.data.page) || undefined;
      const limit = Number(query.data.limit) || undefined;

      const devicesOrError = (await this.deviceServiceInstance.getDevicesRobots(
        filter,
        value,
        page,
        limit
      )) as Result<IPaginationDTO<IDeviceDTO>>;

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
