import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';

export interface IFloorDTO {
  code: FloorCode;
  description?: FloorDescription;
  dimensions: FloorDimensions;
}
