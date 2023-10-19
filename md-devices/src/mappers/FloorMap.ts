import { Mapper } from '../core/infra/Mapper';

import { Document, ObjectId } from 'mongoose';

import { IFloorDTO } from '@/dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Floor } from '@/domain/floor/floor';
import { IFloorPersistence } from '@/dataschema/IFloorPersistence';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      code: floor.code.toString(),
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }

  public static toDomain(
    floor: IFloorPersistence & Document<unknown, unknown, unknown> & { _id: ObjectId }
  ): Floor | null {
    const floorOrError = Floor.create(floor, new UniqueEntityID(floor._id));

    floorOrError.isFailure && console.log(floorOrError.error);

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor) {
    return {
      code: floor.code.toString(),
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }
}
