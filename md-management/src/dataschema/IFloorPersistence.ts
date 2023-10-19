import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';

export interface IFloorPersistence {
  _id: string;
  code: FloorCode;
  description?: FloorDescription;
  dimensions: FloorDimensions;
}
