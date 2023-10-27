import { Service } from '@freshgum/typedi';

import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';
import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import DeviceModelRepo from '@/repos/deviceModelRepo';
import DeviceRepo from '@/repos/deviceRepo';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceRepo from './IRepos/IDeviceRepo';
import IDeviceService from './IServices/IDeviceService';

@Service([DeviceRepo, DeviceModelRepo])
export default class DeviceService implements IDeviceService {
  constructor(private deviceRepo: IDeviceRepo, private deviceModelRepo: IDeviceModelRepo) {}

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
          modelCode: device.modelCode,
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
