import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

export default interface IDeviceModelService {
  createDevice(connectorDTO: IDeviceModelDTO): Promise<Result<IDeviceModelDTO>>;
}
