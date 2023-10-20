import { Mapper } from '../core/infra/Mapper';

import { Document, ObjectId } from 'mongoose';

import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      code: building.code.toString(),
      maxDimensions: {
        width: building.maxDimensions.width,
        height: building.maxDimensions.height
      },
      name: building.name?.value
    };
  }

  public static toDomain(
    building: IBuildingPersistence & Document<unknown, unknown, unknown> & { _id: ObjectId }
  ): Building | null {
    const buildingOrError = Building.create(building, new UniqueEntityID(building._id));

    buildingOrError.isFailure && console.log(buildingOrError.error);

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building) {
    return {
      code: building.code.toString(),
      maxDimensions: {
        width: building.maxDimensions.width,
        height: building.maxDimensions.height
      },
      name: building.name?.value
    };
  }
}
