export interface IDeviceDTO {
  id: string;
  code: string;
  nickname: string;
  modelCode: string;
  description?: string;
  serialNumber: string;
  isAvailable: boolean;
  initialCoordinates: {
    width: number;
    depth: number;
    floorCode: string;
  };
}
