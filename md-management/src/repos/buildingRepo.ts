import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingMapper } from '@/mappers/BuildingMapper';
import { ElevatorMapper } from '@/mappers/ElevatorMapper';
import buildingSchema from '@/persistence/schemas/buildingSchema';
import IBuildingRepo from '@/services/IRepos/IBuildingRepo';
import { injectable } from 'inversify';
import { Document, FilterQuery } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@injectable()
export default class BuildingRepo implements IBuildingRepo {
  constructor() {}

  public async exists(building: Building): Promise<boolean> {
    const idX =
      building.id instanceof BuildingCode ? (<BuildingCode>building.id).value : building.id;

    const query = { domainId: idX };
    const roleDocument = await buildingSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument;
  }

  public async findAll(page: number = 0, count: number = 3): Promise<Building[]> {
    const buildingRecords = await buildingSchema
      .find()
      .limit(count)
      .skip(page * count);
    const buildings: Building[] = [];

    for (const b of buildingRecords) {
      const building = await BuildingMapper.toDomain(b);
      if (building) buildings.push(building);
    }

    return buildings;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id } as FilterQuery<IBuildingPersistence & Document>;

    const buildingDocument = await buildingSchema.findOne(query);

    try {
      if (!buildingDocument) {
        const rawBuilding = BuildingMapper.toPersistence(building);

        const buildingCreated = await buildingSchema.create(rawBuilding);

        const domainBuilding = await BuildingMapper.toDomain(buildingCreated);

        if (!domainBuilding) throw new Error('Building not created');
        return domainBuilding;
      }

      buildingDocument.name = building.name?.value;
      buildingDocument.code = building.code?.value;
      buildingDocument.description = building.description?.value;
      buildingDocument.maxDimensions = {
        width: building.maxDimensions.width,
        length: building.maxDimensions.length
      };
      if (building.elevator)
        buildingDocument.elevator = ElevatorMapper.toPersistence(building.elevator);
      await buildingDocument.save();

      return building;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Building | null> {
    const query: FilterQuery<IBuildingPersistence & Document> = { domainId };

    const buildingRecord = await buildingSchema.findOne(query);

    if (buildingRecord) return BuildingMapper.toDomain(buildingRecord);
    return null;
  }

  public async findByCode(code: BuildingCode): Promise<Building | null> {
    const query: FilterQuery<IBuildingPersistence & Document> = { code: code.value };

    const buildingRecord = await buildingSchema.findOne(query);

    if (buildingRecord) return BuildingMapper.toDomain(buildingRecord);
    return null;
  }
}
