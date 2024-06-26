import { IFloorMapDTO } from './IFloorMapDTO';

export interface IFloorDTO {
  code: string;
  buildingCode: string;
  description?: string;
  dimensions: {
    width: number;
    length: number;
  };
  map?: IFloorMapDTO;
}
