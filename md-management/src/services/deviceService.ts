import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { TYPES } from '@/loaders/inversify/types';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import { inject, injectable } from 'inversify';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceRepo from './IRepos/IDeviceRepo';
import IDeviceService from './IServices/IDeviceService';

@injectable()
export default class DeviceService implements IDeviceService {
  constructor(
    @inject(TYPES.deviceRepo) private deviceRepo: IDeviceRepo,
    @inject(TYPES.deviceModelRepo) private deviceModelRepo: IDeviceModelRepo
  ) { }

  public async createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>> {
    try {
      const code = DeviceCode.create(deviceDTO.code).getValue();
      const nickname = DeviceNickname.create(deviceDTO.nickname).getValue();
      const serialNumber = DeviceSerialNumber.create(deviceDTO.serialNumber).getValue();
      const description = deviceDTO.description
        ? DeviceDescription.create(deviceDTO.description).getValue()
        : undefined;

      const modelCode = DeviceModelCode.create(deviceDTO.modelCode).getValue();
      const model = await this.deviceModelRepo.findByCode(modelCode.value);

      if (!model) return Result.fail<IDeviceDTO>('Model not found');

      const deviceOrError = Device.create({
        code,
        nickname,
        serialNumber,
        description,
        model,
        isAvailable: true
      });

      if (deviceOrError.isFailure) return Result.fail<IDeviceDTO>(deviceOrError.errorValue());

      const deviceResult = deviceOrError.getValue();

      const deviceExists = !!(await this.deviceRepo.findByCode(deviceResult.code));
      if (deviceExists) return Result.fail<IDeviceDTO>('Device already exists');

      await this.deviceRepo.save(deviceResult);

      const deviceDTOResult = DeviceMapper.toDTO(deviceResult) as IDeviceDTO;

      return Result.ok<IDeviceDTO>(deviceDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getDevicesRobots(
    filterStr: string | undefined,
    value: string | undefined
  ): Promise<Result<IDeviceDTO[]>> {
    try {
      const filters = filterStr ? filterStr : '';

      let result: IDeviceDTO[] = [];

      if (filters) {
        if (filters.includes('task')) {
          if (value === undefined) return Result.fail<IDeviceDTO[]>('Value not provided');
          const devices = await this.deviceRepo.findByTask(value);

          if (!devices) return Result.fail<IDeviceDTO[]>('Devices not found');
          result = devices.map(device => {
            const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
            return deviceDTO;
          });
        } else if (filters.includes('name')) {
          if (value === undefined) return Result.fail<IDeviceDTO[]>('Value not provided');
          const devices = await this.deviceRepo.findByName(value);

          if (!devices) return Result.fail<IDeviceDTO[]>('Devices not found');
          result = devices.map(device => {
            const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
            return deviceDTO;
          });
        }
      } else {
        const devices = await this.deviceRepo.findRobots();
        result = devices.map(device => {
          const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
          return deviceDTO;
        });
      }
      return Result.ok<IDeviceDTO[]>(result);
    } catch (e) {
      throw e;
    }
  }

  public async inhibitDevice(code: string): Promise<Result<IDeviceDTO>> {
    try {
      const deviceCode = DeviceCode.create(code).getValue();
      const device = await this.deviceRepo.findByCode(deviceCode);
      if (!device) return Result.fail<IDeviceDTO>('Device not found');

      if (!device.isAvailable) return Result.fail<IDeviceDTO>('Device already inhibited');

      const deviceOrError = Device.create(
        {
          code: device.code,
          nickname: device.nickname,
          serialNumber: device.serialNumber,
          description: device.description,
          model: device.model,
          isAvailable: false
        },
        device.id
      );

      if (deviceOrError.isFailure) return Result.fail<IDeviceDTO>(deviceOrError.errorValue());

      const result = deviceOrError.getValue();
      await this.deviceRepo.save(result);
      const deviceDTOResult = DeviceMapper.toDTO(result) as IDeviceDTO;
      return Result.ok<IDeviceDTO>(deviceDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
