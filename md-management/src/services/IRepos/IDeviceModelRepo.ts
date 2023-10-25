import { DeviceModel } from '@/domain/device-model/device-model';
import { Repo } from '../../core/infra/Repo';

export default interface IDeviceModelRepo extends Repo<DeviceModel> {
  save(deviceModel: DeviceModel): Promise<DeviceModel>;
}
