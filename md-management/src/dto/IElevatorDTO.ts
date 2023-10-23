export interface IElevatorDTO {
  code: number;
  floorIds: string[];
  buildingId: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
