import { Mapper } from '../core/infra/Mapper';

import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingDescription } from '@/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '@/domain/building/buildingMaxDimensions';
import { BuildingName } from '@/domain/building/buildingName';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      code: building.code.code,
      name: building.name?.value,
      description: building.description?.value,
      maxDimensions: {
        width: building.maxDimensions.width,
        height: building.maxDimensions.height
      }
    };
  }

  public static toDomain(building: IBuildingPersistence): Building | null {
    const code = BuildingCode.create(building.code).getValue();
    const maxDimensions = BuildingMaxDimensions.create(
      building.maxDimensions.width,
      building.maxDimensions.height
    ).getValue();
    const name = building.name ? BuildingName.create(building.name).getValue() : undefined;
    const description = building.description
      ? BuildingDescription.create(building.description).getValue()
      : undefined;

    const buildingOrError = Building.create(
      {
        code,
        maxDimensions,
        name,
        description
      },
      new UniqueEntityID(building._id)
    );

    buildingOrError.isFailure && console.log(buildingOrError.error);

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building) {
    return {
      domainId: building.id.toString(),
      code: building.code.code,
      name: building.name?.value,
      description: building.description?.value,
      maxDimensions: {
        width: building.maxDimensions.width,
        height: building.maxDimensions.height
      }
    };
  }
}
