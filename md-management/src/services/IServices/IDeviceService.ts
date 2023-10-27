import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';

export default interface IDeviceService {
  createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>>;
  inhibitDevice(deviceCode: string): Promise<Result<IDeviceDTO>>;
}
