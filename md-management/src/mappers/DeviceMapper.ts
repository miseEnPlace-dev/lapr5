import { Mapper } from '../core/infra/Mapper';

import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import { Device } from '@/domain/device/device';
import { DeviceNickname } from '@/domain/device/deviceNickname';
import { DeviceDescription } from '@/domain/device/deviceDescription';
import { DeviceSerialNumber } from '@/domain/device/deviceSerialNumber';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import Container from 'typedi';
import DeviceModelRepo from '@/repos/deviceModelRepo';

export class DeviceMapper extends Mapper<Device> {
  public static toDTO(device: Device): IDeviceDTO {
    return {
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

    const repo = Container.get(DeviceModelRepo);

    const model = await repo.findByCode(device.modelCode);

    if (!model) throw new Error('Model not found');

    const deviceOrError = Device.create(
      {
        nickname,
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
      nickname: device.nickname.value,
      description: device.description?.value,
      serialNumber: device.serialNumber.value,
      modelCode: device.model.code.value,
      isAvailable: device.isAvailable ? device.isAvailable : true
    };
  }
}
