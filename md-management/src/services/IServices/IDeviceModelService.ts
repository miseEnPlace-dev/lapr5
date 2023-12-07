import { Result } from '@/core/logic/Result';
import { IDeviceModelDTO } from '@/dto/IDeviceModelDTO';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

export default interface IDeviceModelService {
  getDeviceModels(page?: number, limit?: number): Promise<Result<IPaginationDTO<IDeviceModelDTO>>>;
  getDeviceModelWithCode(code: string): Promise<Result<IDeviceModelDTO>>;
  createDeviceModel(deviceModelDTO: IDeviceModelDTO): Promise<Result<IDeviceModelDTO>>;
}
