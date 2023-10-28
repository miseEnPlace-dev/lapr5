import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import { Device } from '@/domain/device/device';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { TYPES, container } from '@/loaders/inversify';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';

export class DeviceMapper extends Mapper<Device> {
  public static toDTO(device: Device): IDeviceDTO {
    return {
      nickname: device.nickname.value,
      code: device.code.value,
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
    const code = DeviceModelCode.create(device.modelCode).getValue();

    const repo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const model = await repo.findByCode(device.modelCode);

    if (!model) throw new Error('Model not found');

    const deviceOrError = Device.create(
      {
        nickname,
        code,
        description,
        serialNumber,
        model,
        isAvailable: device.isAvailable
      },
      new UniqueEntityID(device.domainId)
    );

    deviceOrError.isFailure && console.log(deviceOrError.error);

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
