import { IFloorMapPersistence } from './IFloorMapPersistence';

export interface IFloorPersistence {
  domainId: string;
  code: string;
  description?: string;
  dimensions: {
    width: number;
    length: number;
  };
  map?: IFloorMapPersistence;
  buildingCode: string;
}
