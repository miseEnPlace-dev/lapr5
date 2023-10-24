import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IRolePersistence } from '@/dataschema/IRolePersistence';
import { BuildingCode } from '@/domain/building/buildingCode';
import { FloorMap } from '@/mappers/FloorMap';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import { Document, FilterQuery, Model } from 'mongoose';

@Service()
export default class FloorRepo implements IFloorRepo {
  private floorSchema: Model<IFloorPersistence & Document>;
  constructor() {
    this.floorSchema = Container.get(config.schemas.floor.name);
  }

  public async exists(floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof FloorCode ? (<FloorCode>floor.id).value : floor.id;

    const query = { domainId: idX };
    const roleDocument = await this.floorSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument;
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id } as FilterQuery<IFloorPersistence & Document>;

    const floorDocument = await this.floorSchema.findOne(query);

    try {
      if (!floorDocument) {
        const rawFloor = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        const domainFloor = await FloorMap.toDomain(floorCreated);

        if (!domainFloor) throw new Error('Floor not created');
        return domainFloor;
      }

      const domainFloor = await FloorMap.toDomain(floorDocument);
      if (!domainFloor) throw new Error('Floor not created');

      return domainFloor;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Floor | null> {
    const query = { domainId };
    const floorRecord = await this.floorSchema.findOne(
      query as FilterQuery<IFloorPersistence & Document>
    );

    if (floorRecord != null) return FloorMap.toDomain(floorRecord);
    return null;
  }

  public async findAll(): Promise<Floor[]> {
    const floorRecords = await this.floorSchema.find();

    const floors: Floor[] = [];

    for (const floorRecord of floorRecords) {
      const floor = await FloorMap.toDomain(floorRecord);
      if (floor) floors.push(floor);
    }

    return floors;
  }

  public async findByCode(code: FloorCode | string): Promise<Floor | null> {
    const query = { code };
    const floorRecord = await this.floorSchema.findOne(
      query as FilterQuery<IFloorPersistence & Document>
    );

    if (floorRecord != null) return FloorMap.toDomain(floorRecord);
    return null;
  }

  public async findByBuildingId(buildingId: BuildingCode): Promise<Floor[]> {
    const query = { buildingId: buildingId };
    const floorRecords = await this.floorSchema.find(
      query as FilterQuery<IFloorPersistence & Document>
    );

    const floors: Floor[] = [];

    for (const floorRecord of floorRecords) {
      const floor = await FloorMap.toDomain(floorRecord);
      if (floor) floors.push(floor);
    }

    return floors;
  }

  public async findByBuildingIdWithElevator(buildingId: BuildingCode): Promise<Floor[]> {
    const query = { buildingId: buildingId.toString(), hasElevator: true };
    const floorRecords = await this.floorSchema.find(
      query as FilterQuery<IFloorPersistence & Document>
    );

    const floors: Floor[] = [];

    for (const floorRecord of floorRecords) {
      const floor = await FloorMap.toDomain(floorRecord);
      if (floor) floors.push(floor);
    }

    return floors;
  }
}
