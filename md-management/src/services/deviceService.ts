import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

import IDeviceRepo from './IRepos/IDeviceRepo';
import IDeviceService from './IServices/IDeviceService';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import { Device } from '@/domain/device/device';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';
import { DeviceCode } from '@/domain/device/deviceCode';

@Service()
export default class DeviceService implements IDeviceService {
  private deviceRepo: IDeviceRepo;
  private deviceModelRepo: IDeviceModelRepo;

  constructor() {
    this.deviceRepo = Container.get(config.repos.device.name);
    this.deviceModelRepo = Container.get(config.repos.deviceModel.name);
  }

  public async createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>> {
    try {
      const code = DeviceCode.create(deviceDTO.code).getValue();
      const nickname = DeviceNickname.create(deviceDTO.nickname).getValue();
      const serialNumber = DeviceSerialNumber.create(deviceDTO.serialNumber).getValue();
      const description = deviceDTO.description
        ? DeviceDescription.create(deviceDTO.description).getValue()
        : undefined;

      const modelCode = DeviceModelCode.create(deviceDTO.modelCode).getValue();
      const model = await this.deviceModelRepo.findByCode(modelCode);

      if (!model) return Result.fail<IDeviceDTO>('Model not found');

      const deviceOrError = Device.create({
        code,
        nickname,
        serialNumber,
        description,
        modelCode,
        isAvailable: true
      });

      if (deviceOrError.isFailure) return Result.fail<IDeviceDTO>(deviceOrError.errorValue());

      const deviceResult = deviceOrError.getValue();

      await this.deviceRepo.save(deviceResult);

      const deviceDTOResult = DeviceMapper.toDTO(deviceResult) as IDeviceDTO;

      return Result.ok<IDeviceDTO>(deviceDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
