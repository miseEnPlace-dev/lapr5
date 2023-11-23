import { Device } from "@/model/Device";

export interface IDeviceService {
  getDevicesRobots(
    filter?: "task" | "model",
    value?: string
  ): Promise<Device[]>;
  createDevice(device: Device): Promise<Device>;
  getDevice(deviceCode: string): Promise<Device>;
  inhibitDevice(deviceCode: string): Promise<Device>;
}
