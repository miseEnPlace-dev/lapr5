import { IFloorMapPersistence } from './IFloorMapPersistence';

export interface IFloorPersistence {
  domainId: string;
  code: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
  map?: IFloorMapPersistence;
  building: string;
  buildingCode: string;
}
