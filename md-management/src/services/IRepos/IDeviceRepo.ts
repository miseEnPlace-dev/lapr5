import { Device } from '@/domain/device/device';
import { Repo } from '../../core/infra/Repo';

export default interface IDeviceRepo extends Repo<Device> {
  save(device: Device): Promise<Device>;
}
