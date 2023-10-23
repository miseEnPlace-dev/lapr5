export interface IElevatorDTO {
  code: number;
  floorCodes: string[];
  buildingCode: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
