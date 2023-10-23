export interface IElevatorPersistence {
  domainId: string;
  code: number;
  floors: string[];
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
