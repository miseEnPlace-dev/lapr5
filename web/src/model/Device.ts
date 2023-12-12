export interface Device {
  code: string;
  nickname: string;
  modelCode: string;
  serialNumber: string;
  description?: string;
  isAvailable: boolean;
  initialCoordinates: {
    width: number;
    depth: number;
    floorCode: string;
  };
}
