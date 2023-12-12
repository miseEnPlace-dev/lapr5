export interface IDeviceDTO {
  code: string;
  nickname: string;
  modelCode: string;
  description?: string;
  serialNumber: string;
  isAvailable: boolean;
  initialCoordinates: {
    width: number;
    length: number;
    floorCode: string;
  };
}
