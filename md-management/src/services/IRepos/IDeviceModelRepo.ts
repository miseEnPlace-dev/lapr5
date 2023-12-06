import { DeviceModel } from '@/domain/deviceModel/deviceModel';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '@/domain/deviceModel/deviceModelName';
import { Repo } from '../../core/infra/Repo';

export default interface IDeviceModelRepo extends Repo<DeviceModel> {
  save(deviceModel: DeviceModel): Promise<DeviceModel>;
  findByName(name: DeviceModelName): Promise<DeviceModel | null>;
  findByCode(code: DeviceModelCode): Promise<DeviceModel | null>;
  findAll(page: number, limit: number): Promise<DeviceModel[]>;
  count(): Promise<number>;
}
