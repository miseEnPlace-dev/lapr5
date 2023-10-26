import { Mapper } from '../core/infra/Mapper';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMap } from '@/domain/floor/floorMap/floorMap';
import { IFloorMapDTO } from '@/dto/IFloorMapDTO';
import { IFloorMapPersistence } from '@/dataschema/IFloorMapPersistence';
import { FloorMapSize } from '@/domain/floor/floorMap/floorMapSize';
import { FloorMapElevators } from '@/domain/floor/floorMap/floorMapElevators';
import { FloorMapExitLocation } from '@/domain/floor/floorMap/floorMapExitLocation';
import { FloorMapExits } from '@/domain/floor/floorMap/floorMapExits';
import { FloorMapMatrix } from '@/domain/floor/floorMap/floorMapMatrix';

export class FloorMapMapper extends Mapper<FloorMap> {
  public static toDTO(floorMap: FloorMap): IFloorMapDTO {
    return {
      size: {
        width: floorMap.size.width,
        depth: floorMap.size.depth
      },
      map: floorMap.map.matrix,
      exits: floorMap.exits.exits,
      elevators: floorMap.elevators.elevators,
      exitLocation: floorMap.exitLocation
    };
  }

  public static async toDomain(floorMap: IFloorMapPersistence): Promise<FloorMap | null> {
    const size = FloorMapSize.create(floorMap.size.width, floorMap.size.depth).getValue();

    const mapMatrix = FloorMapMatrix.create(floorMap.map).getValue();

    const exits = FloorMapExits.create(floorMap.exits).getValue();

    const exitLocation = FloorMapExitLocation.create(
      floorMap.exitLocation.x,
      floorMap.exitLocation.y
    ).getValue();

    const elevators = FloorMapElevators.create(floorMap.elevators).getValue();

    const floorMapOrError = FloorMap.create(
      { size: size, map: mapMatrix, exits, exitLocation, elevators },
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
      map: floorMap.map.matrix,
      exits: floorMap.exits.exits,
      elevators: floorMap.elevators.elevators,
      exitLocation: floorMap.exitLocation
    };
  }
}
