import { Floor } from '@/domain/floor/floor';

export interface IElevatorPersistence {
  domainId: string;
  code: number;
  floors: Floor[];
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
}
