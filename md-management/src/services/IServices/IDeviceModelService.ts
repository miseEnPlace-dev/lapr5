import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';

export default interface IDeviceModelService {
  getDeviceModels(): Promise<Result<IDeviceModelDTO>>;
  getDeviceModelWithCode(code: string): Promise<Result<IDeviceModelDTO>>;
  createDeviceModel(deviceModelDTO: IDeviceModelDTO): Promise<Result<IDeviceModelDTO>>;
}
