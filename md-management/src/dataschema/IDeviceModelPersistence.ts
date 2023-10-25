export interface IDeviceModelPersistence {
  domainId: string;
  code: string;
  type: 'robot' | 'drone';
  name: string;
  brand: string;
  capabilities: string[];
}
