export interface IDeviceModelDTO {
  code: string;
  type: 'robot' | 'drone';
  name: string;
  brand: string;
  capabilities: string[];
}
