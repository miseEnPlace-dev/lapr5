import Container, { Service } from 'typedi';

import { IFloorPersistence } from '@/dataschema/IFloorPersistence';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';

import IFloorRepo from '@/services/IRepos/IFloorRepo';
import config from '@/config.mjs';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import { FloorMap } from '@/mappers/FloorMap';

@Service()
export default class FloorRepo implements IFloorRepo {
  private floorSchema: Model<IFloorPersistence & Document>;
  constructor() {
    this.floorSchema = Container.get(config.schemas.floor.name);
  }

  public async exists(floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof FloorCode ? (<FloorCode>floor.id).id.toString() : floor.id;

    const query = { domainId: idX };
    const roleDocument = await this.floorSchema.findOne(
      query as FilterQuery<IRolePersistence & Document>
    );

    return !!roleDocument === true;
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() };

    const buildingDocument = await this.floorSchema.findOne(query);

    try {
      if (!buildingDocument) {
        const rawFloor = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        const domainFloor = FloorMap.toDomain(floorCreated);

        if (!domainFloor) throw new Error('Floor not created');
        return domainFloor;
      }

      const domainFloor = FloorMap.toDomain(buildingDocument);
      if (!domainFloor) throw new Error('Floor not created');

      return domainFloor;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(floorCode: FloorCode | string): Promise<Floor | null> {
    const query = { domainId: floorCode };
    const floorRecord = await this.floorSchema.findOne(
      query as FilterQuery<IFloorPersistence & Document>
    );

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    } else return null;
  }
}
