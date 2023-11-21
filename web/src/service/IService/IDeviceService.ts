import { Device } from "@/model/Device";

export interface IDeviceService {
  getDevicesRobots(
    filterStr?: string[],
    value?: string[]
  ): Promise<Device[]>;
  createDevice(device: Device): Promise<Device>;
  getDevice(deviceCode: string): Promise<Device>;
  inhibitDevice(deviceCode: string): Promise<Device>;
}
