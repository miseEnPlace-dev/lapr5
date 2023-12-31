import { Result } from '@/core/logic/Result';
import { IDeviceDTO } from '@/dto/IDeviceDTO';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

export default interface IDeviceService {
  createDevice(deviceDTO: IDeviceDTO): Promise<Result<IDeviceDTO>>;
  getDevicesRobots(
    filterStr?: string,
    value?: string,
    page?: number,
    limit?: number
  ): Promise<Result<IPaginationDTO<IDeviceDTO>>>;
  inhibitDevice(code: string): Promise<Result<IDeviceDTO>>;
  getDeviceRobotWithCode(code: string): Promise<Result<IDeviceDTO>>;
  getDeviceRobotWithId(id: string): Promise<Result<IDeviceDTO>>;
  findById(id: string): Promise<Result<IDeviceDTO>>;
}
