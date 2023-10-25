import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMap } from '@/domain/floor/floorMap';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import { IFloorMapPersistence } from '@/dataschema/IFloorMapPersistence';

export class FloorMapMapper extends Mapper<FloorMap> {
  public static toDTO(floorMap: FloorMap): IFloorMapDTO {
    return {
      size: {
        width: floorMap.size.width,
        depth: floorMap.size.depth
      },
      map: floorMap.map,
      exits: floorMap.exits,
      elevators: floorMap.elevators,
      exitLocation: floorMap.exitLocation
    };
  }

  public static async toDomain(floorMap: IFloorMapPersistence): Promise<FloorMap | null> {
    const floorMapOrError = FloorMap.create(
      {
        size: {
          width: floorMap.size.width,
          depth: floorMap.size.depth
        },
        map: floorMap.map,
        exits: floorMap.exits,
        elevators: floorMap.elevators,
        exitLocation: floorMap.exitLocation
      },
      new UniqueEntityID(floorMap.domainId)
    );

    floorMapOrError.isFailure && console.log(floorMapOrError.error);

    return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
  }

  public static toPersistence(floorMap: FloorMap): IFloorMapPersistence {
    return {
      domainId: floorMap.id.toString(),
      size: {
        width: floorMap.size.width,
        depth: floorMap.size.depth
      },
      map: floorMap.map,
      exits: floorMap.exits,
      elevators: floorMap.elevators,
      exitLocation: floorMap.exitLocation
    };
  }
}
