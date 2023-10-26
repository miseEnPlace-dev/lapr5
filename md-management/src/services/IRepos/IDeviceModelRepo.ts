import { DeviceModel } from '@/domain/device-model/device-model';
import { Repo } from '../../core/infra/Repo';
import { DeviceModelName } from '@/domain/device-model/deviceModelName';
import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';

export default interface IDeviceModelRepo extends Repo<DeviceModel> {
  save(deviceModel: DeviceModel): Promise<DeviceModel>;
  findByName(name: DeviceModelName | string): Promise<DeviceModel | null>;
  findByCode(code: DeviceModelCode): Promise<DeviceModel | null>;
}
