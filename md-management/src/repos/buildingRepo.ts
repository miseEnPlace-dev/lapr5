import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingMap } from '@/mappers/BuildingMap';
import { ElevatorMap } from '@/mappers/ElevatorMap';
import IBuildingRepo from '@/services/IRepos/IBuildingRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private buildingSchema: Model<IBuildingPersistence & Document>;
  constructor() {
    this.buildingSchema = Container.get(config.schemas.building.name);
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    const buildings = buildingRecords.map(b => BuildingMap.toDomain(b)) as Building[];
    return buildings;
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

  public async save(building: Building): Promise<Building> {
    const query = { id: building.id } as FilterQuery<IBuildingPersistence & Document>;

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (!buildingDocument) {
        const rawBuilding = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        const domainBuilding = BuildingMap.toDomain(buildingCreated);

        if (!domainBuilding) throw new Error('Building not created');
        return domainBuilding;
      }

      buildingDocument.name = building.name?.value;
      buildingDocument.code = building.code?.value;
      buildingDocument.description = building.description?.value;
      if (building.elevator)
        buildingDocument.elevator = ElevatorMap.toPersistence(building.elevator);
      await buildingDocument.save();

      return building;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Building | null> {
    const query = { _id: domainId };

    const buildingRecord = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>
    );

    if (buildingRecord) return BuildingMap.toDomain(buildingRecord);
    return null;
  }

  public async findByCode(code: BuildingCode | string): Promise<Building | null> {
    const query = { code: code.valueOf() };

    const buildingRecord = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>
    );

    if (buildingRecord) return BuildingMap.toDomain(buildingRecord);
    return null;
  }
}
