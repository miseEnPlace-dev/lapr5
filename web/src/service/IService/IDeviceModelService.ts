import { DeviceModel } from "../../model/DeviceModel";

export interface IDeviceModelService {
  getDeviceModels(): Promise<DeviceModel[]>;
  createDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel>;
  updateDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel>;
  getDeviceModelWithCode(code: string): Promise<DeviceModel>;
}
