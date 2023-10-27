import { Mapper } from '../core/infra/Mapper';

import { IDeviceModelPersistence } from '@/dataschema/IDeviceModelPersistence';
import { DeviceModel } from '@/domain/deviceModel/device-model';
import { DeviceModelBrand } from '@/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '@/domain/deviceModel/deviceModelName';
import { Task } from '@/domain/shared/task';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class DeviceModelMapper extends Mapper<DeviceModel> {
  public static toDTO(deviceModel: DeviceModel): IDeviceModelDTO {
    return {
      brand: deviceModel.brand.value,
      capabilities: deviceModel.capabilities.map(capability => capability.value),
      code: deviceModel.code.value,
      name: deviceModel.name.value,
      type: deviceModel.type
    };
  }

  public static async toDomain(deviceModel: IDeviceModelPersistence): Promise<DeviceModel | null> {
    const brand = DeviceModelBrand.create(deviceModel.brand).getValue();
    const code = DeviceModelCode.create(deviceModel.code).getValue();
    const name = DeviceModelName.create(deviceModel.name).getValue();
    const capabilities = deviceModel.capabilities.map(capability =>
      Task.create(capability).getValue()
    );

    const deviceModelOrError = DeviceModel.create(
      {
        brand,
        capabilities,
        code,
        name,
        type: deviceModel.type
      },
      new UniqueEntityID(deviceModel.domainId)
    );

    deviceModelOrError.isFailure && console.log(deviceModelOrError.error);

    return deviceModelOrError.isSuccess ? deviceModelOrError.getValue() : null;
  }

  public static toPersistence(deviceModel: DeviceModel): IDeviceModelPersistence {
    return {
      domainId: deviceModel.id.toString(),
      brand: deviceModel.brand.value,
      capabilities: deviceModel.capabilities.map(capability => capability.value),
      code: deviceModel.code.value,
      name: deviceModel.name.value,
      type: deviceModel.type
    };
  }
}
