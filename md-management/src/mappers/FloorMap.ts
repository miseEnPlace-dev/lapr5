import { Mapper } from '../core/infra/Mapper';

import { Document, ObjectId } from 'mongoose';

import config from '@/config.mjs';
import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { IFloorDTO } from '@/dto/IFloorDTO';
import IBuildingRepo from '@/services/IRepos/IBuildingRepo';
import Container from 'typedi';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      code: floor.code.value,
      buildingCode: floor.building.code.value,
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

    const repo = Container.get<IBuildingRepo>(config.repos.building.name);

    const building = await repo.findByDomainId(floor.building);
    if (!building) throw new Error('Building not found');

    const floorDimensionsOrError = FloorDimensions.create(
      width,
      height,
      building.maxDimensions.width,
      building.maxDimensions.height
    );

    const description = floor.description
      ? FloorDescription.create(floor.description).getValue()
      : undefined;

    const floorOrError = Floor.create(
      {
        code,
        description,
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
      code: floor.code.value.toString(),
      domainId: floor.id.toValue(),
      building: floor.building.id.toString(),
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }
}
