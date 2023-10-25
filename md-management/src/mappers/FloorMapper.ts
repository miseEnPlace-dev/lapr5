import { Mapper } from '../core/infra/Mapper';

import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMapper extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      code: floor.code.value,
      buildingCode: floor.buildingCode.value,
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }

  public static async toDomain(floor: IFloorPersistence): Promise<Floor | null> {
    const code = FloorCode.create(floor.code).getValue();
    const { width, height } = floor.dimensions;

    const buildingCode = BuildingCode.create(floor.buildingCode).getValue();
    const floorDimensionsOrError = FloorDimensions.create(width, height);

    const description = floor.description
      ? FloorDescription.create(floor.description).getValue()
      : undefined;

    const floorOrError = Floor.create(
      {
        code,
        description,
        buildingCode,
        dimensions: floorDimensionsOrError.getValue()
      },
      new UniqueEntityID(floor.domainId)
    );

    floorOrError.isFailure && console.log(floorOrError.error);

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor): IFloorPersistence {
    return {
      code: floor.code.value.toString(),
      domainId: floor.id.toString(),
      buildingCode: floor.buildingCode.value,
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        height: floor.dimensions.height
      }
    };
  }
}
