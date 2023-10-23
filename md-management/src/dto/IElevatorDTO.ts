export interface IElevatorDTO {
  code: number;
  floorIds: string[];
  buildingCode: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
