import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { FloorCode } from '@/domain/floor/floorCode';
import { DeviceCoordinates } from '@/domain/device/deviceCoordinates';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';
import IFloorRepo from '@/services/IRepos/IFloorRepo';

export class DeviceMapper extends Mapper<Device> {
  public static toDTO(device: Device): IDeviceDTO {
    return {
      id: device.id.toString(),
      code: device.code.value,
      nickname: device.nickname.value,
      description: device.description?.value,
      serialNumber: device.serialNumber.value,
      modelCode: device.model.code.value,
      isAvailable: device.isAvailable !== undefined ? device.isAvailable : true,
      initialCoordinates: {
        width: device.initialCoordinates.width,
        depth: device.initialCoordinates.depth,
        floorCode: device.initialCoordinates.floorCode.value
      }
    };
  }

  public static async toDomain(device: IDevicePersistence): Promise<Device | null> {
    const nickname = DeviceNickname.create(device.nickname).getValue();
    const description = device.description
      ? DeviceDescription.create(device.description).getValue()
      : undefined;
    const serialNumber = DeviceSerialNumber.create(device.serialNumber).getValue();
    const code = DeviceCode.create(device.code).getValue();

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const modelCode = DeviceModelCode.create(device.modelCode).getValue();
    const model = await deviceModelRepo.findByCode(modelCode);
    if (!model) throw new Error('Model not found');

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const floorCode = FloorCode.create(device.initialCoordinates.floorCode).getValue();
    const floor = await floorRepo.findByCode(floorCode);

    if (!floor) throw new Error('Floor not found');

    if (!nickname || !serialNumber || !code || !modelCode || !floorCode)
      throw new Error('Invalid device data');

    const initialCoordinates = DeviceCoordinates.create(
      device.initialCoordinates.width,
      device.initialCoordinates.depth,
      floor.code
    ).getValue();

    if (!initialCoordinates) throw new Error('Invalid initial coordinates');

    const deviceOrError = Device.create(
      {
        code,
        nickname,
        description,
        serialNumber,
        model,
        isAvailable: device.isAvailable,
        initialCoordinates
      },
      new UniqueEntityID(device.domainId)
    );

    return deviceOrError.isSuccess ? deviceOrError.getValue() : null;
  }

  public static toPersistence(device: Device): IDevicePersistence {
    return {
      domainId: device.id.toString(),
      code: device.code.value,
      nickname: device.nickname.value,
      description: device.description?.value,
      serialNumber: device.serialNumber.value,
      modelCode: device.model.code.value,
      isAvailable: device.isAvailable !== undefined ? device.isAvailable : true,
      initialCoordinates: {
        width: device.initialCoordinates.width,
        depth: device.initialCoordinates.depth,
        floorCode: device.initialCoordinates.floorCode.value
      }
    };
  }
}
