import { DeviceModel } from "../../model/DeviceModel";

export interface IDeviceModelService {
  getDeviceModels(): Promise<DeviceModel[]>;
  createDeviceModel(building: DeviceModel): Promise<DeviceModel>;
  getDeviceModelWithCode(code: string): Promise<DeviceModel>;
}
