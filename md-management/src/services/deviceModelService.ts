import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

import { DeviceModel } from '@/domain/deviceModel/deviceModel';
import { DeviceModelBrand } from '@/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '@/domain/deviceModel/deviceModelName';
import { Task } from '@/domain/shared/task';
import { TYPES } from '@/loaders/inversify/types';
import { DeviceModelMapper } from '@/mappers/DeviceModelMapper';
import { inject, injectable } from 'inversify';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceModelService from './IServices/IDeviceModelService';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

@injectable()
export default class DeviceModelService implements IDeviceModelService {
  constructor(@inject(TYPES.deviceModelRepo) private deviceModelRepo: IDeviceModelRepo) {}

  public async createDeviceModel(
    deviceModelDTO: IDeviceModelDTO
  ): Promise<Result<IDeviceModelDTO>> {
    try {
      const codeOrError = DeviceModelCode.create(deviceModelDTO.code);
      if (codeOrError.isFailure) return Result.fail<IDeviceModelDTO>(codeOrError.errorValue());

      const brandOrError = DeviceModelBrand.create(deviceModelDTO.brand);
      if (brandOrError.isFailure) return Result.fail<IDeviceModelDTO>(brandOrError.errorValue());

      const nameOrError = DeviceModelName.create(deviceModelDTO.name);
      if (nameOrError.isFailure) return Result.fail<IDeviceModelDTO>(nameOrError.errorValue());

      const capabilities = deviceModelDTO.capabilities.map(capability =>
        Task.create(capability).getValue()
      );

      const deviceModelOrError = DeviceModel.create({
        code: codeOrError.getValue(),
        brand: brandOrError.getValue(),
        type: deviceModelDTO.type,
        capabilities,
        name: nameOrError.getValue()
      });

      if (deviceModelOrError.isFailure)
        return Result.fail<IDeviceModelDTO>(deviceModelOrError.errorValue());

      const deviceModelResult = deviceModelOrError.getValue();

      const deviceModelExists = !!(await this.deviceModelRepo.findByCode(deviceModelResult.code));
      if (deviceModelExists) return Result.fail<IDeviceModelDTO>('Device Model already exists');

      await this.deviceModelRepo.save(deviceModelResult);

      const deviceModelDTOResult = DeviceModelMapper.toDTO(deviceModelResult) as IDeviceModelDTO;
      return Result.ok<IDeviceModelDTO>(deviceModelDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getDeviceModels(
    page: number = 1,
    limit: number = 3
  ): Promise<Result<IPaginationDTO<IDeviceModelDTO>>> {
    try {
      const deviceModels = await this.deviceModelRepo.findAll(page - 1, limit);
      const deviceModelDTOs = deviceModels.map(b => DeviceModelMapper.toDTO(b));
      const total = await this.deviceModelRepo.count();

      const result: IPaginationDTO<IDeviceModelDTO> = {
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        data: deviceModelDTOs
      };

      return Result.ok<IPaginationDTO<IDeviceModelDTO>>(result);
    } catch (e) {
      throw e;
    }
  }

  public async getDeviceModelWithCode(code: string): Promise<Result<IDeviceModelDTO>> {
    try {
      const deviceModelCode = DeviceModelCode.create(code);
      if (deviceModelCode.isFailure) return Result.fail<IDeviceModelDTO>('Device Model not found');

      const deviceModel = await this.deviceModelRepo.findByCode(deviceModelCode.getValue());
      if (!deviceModel) return Result.fail<IDeviceModelDTO>('Device Model not found');

      const deviceModelDTO = DeviceModelMapper.toDTO(deviceModel);
      return Result.ok<IDeviceModelDTO>(deviceModelDTO);
    } catch (e) {
      throw e;
    }
  }
}
