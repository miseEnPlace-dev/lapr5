export interface IElevatorDTO {
  id: string;
  buildingCode: string;
  floorCodes: string[];
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
