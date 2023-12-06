import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { DeviceModel } from "../../model/DeviceModel";

export interface IDeviceModelService {
  getDeviceModels(page?: number, limit?: number): Promise<IPaginationDTO<DeviceModel>>;
  createDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel>;
  updateDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel>;
  getDeviceModelWithCode(code: string): Promise<DeviceModel>;
}
