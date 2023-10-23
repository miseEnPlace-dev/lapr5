import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { IBuildingPersistence } from '@/dataschema/IBuildingPersistence';
import { Building } from '@/domain/building/building';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingMap } from '@/mappers/BuildingMap';
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
      building.id instanceof BuildingCode ? (<BuildingCode>building.id).code : building.id;

    const query = { domainId: idX };
    const roleDocument = await this.buildingSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id } as FilterQuery<IBuildingPersistence & Document>;

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (!buildingDocument) {
        const rawBuilding = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        const domainBuilding = BuildingMap.toDomain(buildingCreated);

        if (!domainBuilding) throw new Error('Building not created');
        return domainBuilding;
      }

      const domainBuilding = BuildingMap.toDomain(buildingDocument);
      if (!domainBuilding) throw new Error('Building not created');

      return domainBuilding;
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();

    if (!buildingRecords || !buildingRecords.length) return [];

    return buildingRecords.map(buildingRecord =>
      BuildingMap.toDomain(buildingRecord)
    ) as Building[];
  }

  public async findByDomainId(buildingCode: BuildingCode | string): Promise<Building | null> {
    const query = { code: buildingCode };

    const buildingRecord = await this.buildingSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    if (buildingRecord != null) return BuildingMap.toDomain(buildingRecord);
    return null;
  }
}
