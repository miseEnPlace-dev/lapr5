import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { container } from '@/loaders/inversify';
import { TYPES } from '@/loaders/inversify/types';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';

export class DeviceMapper extends Mapper<Device> {
  public static toDTO(device: Device): IDeviceDTO {
    return {
      code: device.code.value,
      nickname: device.nickname.value,
      description: device.description?.value,
      serialNumber: device.serialNumber.value,
      modelCode: device.model.code.value,
      isAvailable: device.isAvailable ? device.isAvailable : true
    };
  }

  public static async toDomain(device: IDevicePersistence): Promise<Device | null> {
    const nickname = DeviceNickname.create(device.nickname).getValue();
    const description = device.description
      ? DeviceDescription.create(device.description).getValue()
      : undefined;
    const serialNumber = DeviceSerialNumber.create(device.serialNumber).getValue();
    const code = DeviceCode.create(device.code).getValue();

    const repo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const modelCode = DeviceModelCode.create(device.modelCode).getValue();
    const model = await repo.findByCode(modelCode);

    if (!model) throw new Error('Model not found');

    const deviceOrError = Device.create(
      {
        code,
        nickname,
        description,
        serialNumber,
        model,
        isAvailable: device.isAvailable
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
      isAvailable: device.isAvailable ? device.isAvailable : true
    };
  }
}
