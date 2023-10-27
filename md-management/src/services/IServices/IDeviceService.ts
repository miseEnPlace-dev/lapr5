import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

export default interface IDeviceService {
  createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>>;
  getDevicesRobots(): Promise<Result<IDeviceDTO[]>>;
  inhibitDevice(code: string): Promise<Result<IDeviceDTO>>;
}
