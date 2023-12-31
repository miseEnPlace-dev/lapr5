import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { Repo } from '@/core/infra/Repo';
import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';

export default interface IDeviceRepo extends Repo<Device> {
  save(device: Device): Promise<Device>;
  findRobots(): Promise<Device[]>;
  findByDomainId(domainId: UniqueEntityID | string): Promise<Device | null>;
  findAll(): Promise<Device[]>;
  findByCode(code: DeviceCode): Promise<Device | null>;
  findByModel(code: string): Promise<Device[] | null>;
  findByTask(task: string): Promise<Device[] | null>;
  count(): Promise<number>;
  findById(id: UniqueEntityID | string): Promise<Device | null>;
}
