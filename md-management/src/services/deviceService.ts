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
      const nickname = DeviceNickname.create(deviceDTO.nickname).getValue();
      const serialNumber = DeviceSerialNumber.create(deviceDTO.serialNumber).getValue();
      const description = deviceDTO.description
        ? DeviceDescription.create(deviceDTO.description).getValue()
        : undefined;

      const modelCode = DeviceModelCode.create(deviceDTO.modelCode).getValue();
      const model = await this.deviceModelRepo.findByCode(modelCode.value);

      if (!model) return Result.fail<IDeviceDTO>('Model not found');

      const deviceOrError = Device.create({
        nickname,
        serialNumber,
        description,
        model,
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

  public async getDevicesRobots(): Promise<Result<IDeviceDTO[]>> {
    try {
      const devices = await this.deviceRepo.findRobots();

      const devicesDTOs = devices.map(device => DeviceMapper.toDTO(device) as IDeviceDTO);

      return Result.ok<IDeviceDTO[]>(devicesDTOs);
    } catch (e) {
      throw e;
    }
  }
}
