import { IElevatorPersistence } from './IElevatorPersistence';

export interface IBuildingPersistence {
  domainId: string;
  code: string;
  name?: string;
  description?: string;
  elevator?: IElevatorPersistence;
  maxDimensions: {
    width: number;
    height: number;
  };
}
