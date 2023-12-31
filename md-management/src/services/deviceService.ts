import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceCoordinates } from '@/domain/device/deviceCoordinates';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { FloorCode } from '@/domain/floor/floorCode';
import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { TYPES } from '@/loaders/inversify/types';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import { inject, injectable } from 'inversify';
import IDeviceModelRepo from './IRepos/IDeviceModelRepo';
import IDeviceRepo from './IRepos/IDeviceRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IDeviceService from './IServices/IDeviceService';

@injectable()
export default class DeviceService implements IDeviceService {
  constructor(
    @inject(TYPES.deviceRepo) private deviceRepo: IDeviceRepo,
    @inject(TYPES.deviceModelRepo) private deviceModelRepo: IDeviceModelRepo,
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo
  ) {}

  public async createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>> {
    try {
      const codeOrError = DeviceCode.create(deviceDTO.code);
      if (codeOrError.isFailure) return Result.fail<IDeviceDTO>(codeOrError.errorValue());

      const nicknameOrError = DeviceNickname.create(deviceDTO.nickname);
      if (nicknameOrError.isFailure) return Result.fail<IDeviceDTO>(nicknameOrError.errorValue());

      const serialNumberOrError = DeviceSerialNumber.create(deviceDTO.serialNumber);
      if (serialNumberOrError.isFailure)
        return Result.fail<IDeviceDTO>(serialNumberOrError.errorValue());
      const descriptionOrError = deviceDTO.description
        ? DeviceDescription.create(deviceDTO.description)
        : undefined;
      if (descriptionOrError && descriptionOrError.isFailure)
        return Result.fail<IDeviceDTO>(descriptionOrError.errorValue());

      const modelCodeOrError = DeviceModelCode.create(deviceDTO.modelCode);
      if (modelCodeOrError.isFailure) return Result.fail<IDeviceDTO>(modelCodeOrError.errorValue());

      const model = await this.deviceModelRepo.findByCode(modelCodeOrError.getValue());

      if (!model) return Result.fail<IDeviceDTO>('Model not found');

      const floorCode = FloorCode.create(deviceDTO.initialCoordinates.floorCode).getValue();
      const floor = await this.floorRepo.findByCode(floorCode);

      if (!floor) return Result.fail<IDeviceDTO>('Floor not found');

      const initialCoordinatesOrError = DeviceCoordinates.create(
        deviceDTO.initialCoordinates.width,
        deviceDTO.initialCoordinates.depth,
        floor.code
      ).getValue();

      const deviceOrError = Device.create({
        code: codeOrError.getValue(),
        nickname: nicknameOrError.getValue(),
        serialNumber: serialNumberOrError.getValue(),
        description: descriptionOrError ? descriptionOrError.getValue() : undefined,
        model,
        isAvailable: true,
        initialCoordinates: initialCoordinatesOrError
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

  async findById(id: string): Promise<Result<IDeviceDTO>> {
    try {
      const device = await this.deviceRepo.findById(id);
      if (!device) return Result.fail<IDeviceDTO>('Device not found');

      const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
      return Result.ok<IDeviceDTO>(deviceDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getDevicesRobots(
    filterStr: string | undefined,
    value: string | undefined,
    page: number = 1,
    limit: number = 3
  ): Promise<Result<IPaginationDTO<IDeviceDTO>>> {
    try {
      const filters = filterStr ? filterStr : '';

      let devicesDTO: IDeviceDTO[] = [];

      if (filters) {
        if (filters.includes('task')) {
          if (value === undefined)
            return Result.fail<IPaginationDTO<IDeviceDTO>>('Value not provided');
          const devices = await this.deviceRepo.findByTask(value);

          if (!devices) return Result.fail<IPaginationDTO<IDeviceDTO>>('Devices not found');
          devicesDTO = devices.map(device => {
            const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
            return deviceDTO;
          });
        } else if (filters.includes('model')) {
          if (value === undefined)
            return Result.fail<IPaginationDTO<IDeviceDTO>>('Value not provided');
          const devices = await this.deviceRepo.findByModel(value);

          if (!devices) return Result.fail<IPaginationDTO<IDeviceDTO>>('Devices not found');
          devicesDTO = devices.map(device => {
            const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
            return deviceDTO;
          });
        } else {
          return Result.fail<IPaginationDTO<IDeviceDTO>>('Invalid filter');
        }
      } else {
        const devices = await this.deviceRepo.findRobots();

        devicesDTO = devices.map(device => {
          const deviceDTO = DeviceMapper.toDTO(device) as IDeviceDTO;
          return deviceDTO;
        });
      }
      const start = (page - 1) * limit;
      const total = devicesDTO.length;

      const result: IPaginationDTO<IDeviceDTO> = {
        meta: {
          total,
          limit,
          page,
          totalPages: Math.ceil(total / limit)
        },
        data: devicesDTO.slice(start, start + limit)
      };

      return Result.ok<IPaginationDTO<IDeviceDTO>>(result);
    } catch (e) {
      throw e;
    }
  }

  public async inhibitDevice(code: string): Promise<Result<IDeviceDTO>> {
    try {
      const deviceCode = DeviceCode.create(code).getValue();
      const device = await this.deviceRepo.findByCode(deviceCode);
      if (!device) return Result.fail<IDeviceDTO>('Device not found');

      const deviceOrError = Device.create(
        {
          code: device.code,
          nickname: device.nickname,
          serialNumber: device.serialNumber,
          description: device.description,
          model: device.model,
          isAvailable: !device.isAvailable,
          initialCoordinates: device.initialCoordinates
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

  public async getDeviceRobotWithCode(code: string): Promise<Result<IDeviceDTO>> {
    try {
      const deviceCode = DeviceCode.create(code).getValue();
      const device = await this.deviceRepo.findByCode(deviceCode);
      if (!device) return Result.fail<IDeviceDTO>('Device not found');

      const deviceDTOResult = DeviceMapper.toDTO(device) as IDeviceDTO;
      return Result.ok<IDeviceDTO>(deviceDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getDeviceRobotWithId(id: string): Promise<Result<IDeviceDTO>> {
    try {
      const device = await this.deviceRepo.findByDomainId(id);
      if (!device) return Result.fail<IDeviceDTO>('Device not found');

      const deviceDTOResult = DeviceMapper.toDTO(device) as IDeviceDTO;
      return Result.ok<IDeviceDTO>(deviceDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
