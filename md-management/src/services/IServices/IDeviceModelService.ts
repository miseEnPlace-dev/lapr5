import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

export default interface IDeviceModelService {
  createDeviceModel(deviceModelDTO: IDeviceModelDTO): Promise<Result<IDeviceModelDTO>>;
}
