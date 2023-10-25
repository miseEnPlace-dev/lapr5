import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IRolePersistence } from '@/dataschema/IRolePersistence';
import { FloorMapper } from '@/mappers/FloorMapper';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { FloorMapMapper } from '@/mappers/FloorMapMapper';
import { BuildingCode } from '@/domain/building/buildingCode';

@Service()
export default class FloorRepo implements IFloorRepo {
  private floorSchema: Model<IFloorPersistence & Document>;
  constructor() {
    this.floorSchema = Container.get(config.schemas.floor.name);
  }

  public async exists(floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof FloorCode ? (<FloorCode>floor.id).value : floor.id;

    const query: FilterQuery<IRolePersistence & Document> = { domainId: idX };
    const roleDocument = await this.floorSchema.findOne(query);

    return !!roleDocument;
  }

  public async findBuildingCodesWithMinMaxFloors(min: number, max: number): Promise<string[]> {
    const floors = await this.floorSchema.aggregate([
      {
        $group: {
          _id: '$building',
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: min, $lte: max }
        }
      }
    ]);
    return floors.map(f => f._id);
  }

  public async save(floor: Floor): Promise<Floor> {
    const query: FilterQuery<IFloorPersistence & Document> = { domainId: floor.id };

    const floorDocument = await this.floorSchema.findOne(query);

    try {
      if (!floorDocument) {
        const rawFloor = FloorMapper.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        const domainFloor = await FloorMapper.toDomain(floorCreated);

        if (!domainFloor) throw new Error('Floor not created');
        return domainFloor;
      }

      floorDocument.code = floor.code?.value;
      floorDocument.description = floor.description?.value;
      floorDocument.dimensions.width = floor.dimensions?.width;
      floorDocument.dimensions.height = floor.dimensions?.height;
      if (floor.map) floorDocument.map = FloorMapMapper.toPersistence(floor.map);
      await floorDocument.save();

      return floor;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Floor | null> {
    const query: FilterQuery<IFloorPersistence & Document> = { domainId };
    const floorRecord = await this.floorSchema.findOne(query);

    if (floorRecord != null) return FloorMapper.toDomain(floorRecord);
    return null;
  }

  public async findAll(): Promise<Floor[]> {
    const floorRecords = await this.floorSchema.find();

    const floors: Floor[] = [];

    for (const floorRecord of floorRecords) {
      const floor = await FloorMapper.toDomain(floorRecord);
      if (floor) floors.push(floor);
    }

    return floors;
  }

  public async findByCode(code: FloorCode | string): Promise<Floor | null> {
    const query: FilterQuery<IFloorPersistence & Document> = { code };
    const floorRecord = await this.floorSchema.findOne(query);

    if (floorRecord != null) return FloorMapper.toDomain(floorRecord);
    return null;
  }

  public async findByBuildingCode(code: BuildingCode): Promise<Floor[]> {
    const query: FilterQuery<IFloorPersistence & Document> = {
      buildingCode: code.value
    };

    const floorRecords = await this.floorSchema.find(query);

    const floors: Floor[] = [];

    for (const floorRecord of floorRecords) {
      const floor = await FloorMapper.toDomain(floorRecord);
      if (floor) floors.push(floor);
    }

    return floors;
  }
}
