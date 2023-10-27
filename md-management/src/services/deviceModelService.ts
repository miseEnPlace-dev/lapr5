import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

import { DeviceModel } from '@/domain/device-model/device-model';
import { DeviceModelBrand } from '@/domain/device-model/deviceModelBrand';
import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';
import { DeviceModelName } from '@/domain/device-model/deviceModelName';
import { Task } from '@/domain/shared/task';
import { DeviceModelMapper } from '@/mappers/DeviceModelMapper';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceModelService from './IServices/IDeviceModelService';

@Service()
export default class DeviceModelService implements IDeviceModelService {
  private deviceModelRepo: IDeviceModelRepo;

  constructor(deviceModelRepo?: IDeviceModelRepo) {
    if (deviceModelRepo) this.deviceModelRepo = deviceModelRepo;
    else this.deviceModelRepo = Container.get(config.repos.deviceModel.name);
  }

  public async createDevice(deviceModelDTO: IDeviceModelDTO): Promise<Result<IDeviceModelDTO>> {
    try {
      const code = DeviceModelCode.create(deviceModelDTO.code).getValue();
      const brand = DeviceModelBrand.create(deviceModelDTO.brand).getValue();
      const name = DeviceModelName.create(deviceModelDTO.name).getValue();
      const capabilities = deviceModelDTO.capabilities.map(capability =>
        Task.create(capability).getValue()
      );

      const deviceModelOrError = DeviceModel.create({
        code,
        brand,
        type: deviceModelDTO.type,
        capabilities,
        name
      });

      if (deviceModelOrError.isFailure)
        return Result.fail<IDeviceModelDTO>(deviceModelOrError.errorValue());

      const deviceModelResult = deviceModelOrError.getValue();

      await this.deviceModelRepo.save(deviceModelResult);

      const deviceModelDTOResult = DeviceModelMapper.toDTO(deviceModelResult) as IDeviceModelDTO;
      return Result.ok<IDeviceModelDTO>(deviceModelDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
