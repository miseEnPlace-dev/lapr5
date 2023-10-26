import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingMapper } from '@/mappers/BuildingMapper';
import { ElevatorMapper } from '@/mappers/ElevatorMapper';
import IBuildingRepo from '@/services/IRepos/IBuildingRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private buildingSchema: Model<IBuildingPersistence & Document>;
  constructor() {
    this.buildingSchema = Container.get(config.schemas.building.name);
  }

  public async exists(building: Building): Promise<boolean> {
    const idX =
      building.id instanceof BuildingCode ? (<BuildingCode>building.id).value : building.id;

    const query = { domainId: idX };
    const roleDocument = await this.buildingSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument;
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    const buildings: Building[] = [];

    for (const b of buildingRecords) {
      const building = await BuildingMapper.toDomain(b);
      if (building) buildings.push(building);
    }

    return buildings;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id } as FilterQuery<IBuildingPersistence & Document>;

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (!buildingDocument) {
        const rawBuilding = BuildingMapper.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        const domainBuilding = await BuildingMapper.toDomain(buildingCreated);

        if (!domainBuilding) throw new Error('Building not created');
        return domainBuilding;
      }

      buildingDocument.name = building.name?.value;
      buildingDocument.code = building.code?.value;
      buildingDocument.description = building.description?.value;
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

    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord) return BuildingMapper.toDomain(buildingRecord);
    return null;
  }

  public async findByCode(code: BuildingCode): Promise<Building | null> {
    const query: FilterQuery<IBuildingPersistence & Document> = { code: code.value };

    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord) return BuildingMapper.toDomain(buildingRecord);
    return null;
  }
}
