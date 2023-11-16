export interface IElevatorPersistence {
  code: number;
  floors: string[];
  branding?: {
    brand: string;
    model: string;
  };
  serialNumber?: string;
  description?: string;
}
