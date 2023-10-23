import { Mapper } from '../core/infra/Mapper';

import { Document, ObjectId } from 'mongoose';

import { IFloorDTO } from '@/dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Floor } from '@/domain/floor/floor';
import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import Container from 'typedi';
import BuildingRepo from '@/repos/buildingRepo';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      code: floor.code.code.toString(),
      buildingCode: floor.building.code.code.toString(),
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }

  public static async toDomain(
    floor: IFloorPersistence & Document<unknown, unknown, unknown> & { _id: ObjectId }
  ): Promise<Floor | null> {
    const code = FloorCode.create(floor.code).getValue();
    const { width, height } = floor.dimensions;

    const repo = Container.get(BuildingRepo);

    const building = await repo.findByDomainId(floor.buildingCode);
    if (!building) throw new Error('Building not found');

    const floorDimensionsOrError = FloorDimensions.create(
      width,
      height,
      building.maxDimensions.width,
      building.maxDimensions.height
    );

    const floorOrError = Floor.create(
      {
        code,
        building,
        dimensions: floorDimensionsOrError.getValue()
      },
      new UniqueEntityID(floor._id)
    );

    floorOrError.isFailure && console.log(floorOrError.error);

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor) {
    return {
      code: floor.code.code.toString(),
      domainId: floor.id.toString(),
      buildingCode: floor.building.code.toString(),
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }
}
