import { Elevator } from '@/domain/elevator/elevator';

export interface IBuildingPersistence {
  _id: string;
  domainId: string;
  code: string;
  name?: string;
  description?: string;
  elevator?: Elevator;
  maxDimensions: {
    width: number;
    height: number;
  };
}
