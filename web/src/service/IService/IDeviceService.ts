import { Device } from "@/model/Device";

export interface IDeviceService {
  getDevicesRobots(): Promise<Device[]>;
  createDevice(device: Device): Promise<Device>;
}
