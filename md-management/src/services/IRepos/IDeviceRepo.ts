import { Device } from '@/domain/device/device';
import { Repo } from '../../core/infra/Repo';

export default interface IDeviceRepo extends Repo<Device> {
  save(device: Device): Promise<Device>;
  findByDomainId(domainId: string): Promise<Device | null>;
  findByCode(code: string): Promise<Device | null>;
  exists(device: Device): Promise<boolean>;
  findAll(): Promise<Device[]>;
}
