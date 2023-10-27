import { Service } from '@freshgum/typedi';

import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

import { DeviceModel } from '@/domain/deviceModel/device-model';
import { DeviceModelBrand } from '@/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '@/domain/deviceModel/deviceModelName';
import { Task } from '@/domain/shared/task';
import { DeviceModelMapper } from '@/mappers/DeviceModelMapper';
import DeviceModelRepo from '@/repos/deviceModelRepo';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceModelService from './IServices/IDeviceModelService';

@Service([DeviceModelRepo])
export default class DeviceModelService implements IDeviceModelService {
  constructor(private deviceModelRepo: IDeviceModelRepo) {}

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
