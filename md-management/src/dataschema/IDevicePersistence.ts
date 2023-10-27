export interface IDevicePersistence {
  domainId: string;
  nickname: string;
  modelCode: string;
  description?: string;
  serialNumber: string;
  isAvailable: boolean;
}
