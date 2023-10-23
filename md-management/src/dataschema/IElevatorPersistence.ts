export interface IElevatorPersistence {
  domainId: string;
  code: number;
  floorIds: string[];
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
