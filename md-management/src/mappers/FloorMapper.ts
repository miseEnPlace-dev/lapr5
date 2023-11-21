import { Mapper } from '../core/infra/Mapper';

import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMapMapper } from './FloorMapMapper';

export class FloorMapper extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      code: floor.code.value,
      buildingCode: floor.buildingCode.value,
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        length: floor.dimensions.length
      },
      map: floor.map ? FloorMapMapper.toDTO(floor.map) : undefined
    };
  }

  public static async toDomain(floor: IFloorPersistence): Promise<Floor | null> {
    const code = FloorCode.create(floor.code).getValue();
    const { width, length } = floor.dimensions;

    const buildingCode = BuildingCode.create(floor.buildingCode).getValue();
    const floorDimensionsOrError = FloorDimensions.create(width, length);

    const description = floor.description
      ? FloorDescription.create(floor.description).getValue()
      : undefined;
    const map = floor.map ? await FloorMapMapper.toDomain(floor.map) : null;

    const floorOrError = Floor.create(
      {
        code,
        description,
        buildingCode,
        dimensions: floorDimensionsOrError.getValue(),
        map: map === null ? undefined : map
      },
      new UniqueEntityID(floor.domainId)
    );

    floorOrError.isFailure && console.log(floorOrError.error);

    if (floorOrError.isFailure) {
      return null;
    }

    return floorOrError.getValue();
  }

  public static toPersistence(floor: Floor): IFloorPersistence {
    return {
      code: floor.code.value.toString(),
      domainId: floor.id.toString(),
      buildingCode: floor.buildingCode.value,
      description: floor.description?.value,
      dimensions: {
        width: floor.dimensions.width,
        length: floor.dimensions.length
      },
      map: floor.map ? FloorMapMapper.toPersistence(floor.map) : undefined
    };
  }
}
