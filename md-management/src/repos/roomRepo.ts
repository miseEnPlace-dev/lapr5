import config from '@/config.mjs';
import { IRoomPersistence } from '@/dataschema/IRoomPersistence';
import { Room } from '@/domain/room/room';
import { RoomMap } from '@/mappers/RoomMap';
import IRoomRepo from '@/services/IRepos/IRoomRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import Container, { Service } from 'typedi';

@Service()
export default class RoomRepo implements IRoomRepo {
  private roomSchema: Model<IRoomPersistence & Document>;
  constructor() {
    this.roomSchema = Container.get(config.schemas.room.name);
  }

  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id } as FilterQuery<IRoomPersistence & Document>;

    const roomDocument = await this.roomSchema.findOne(query);

    try {
      if (!roomDocument) {
        const rawRoom = RoomMap.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        const roomDomain = await RoomMap.toDomain(roomCreated);

        if (!roomDomain) throw new Error('Room not created');
        return roomDomain;
      }
      const domainRoom = await RoomMap.toDomain(roomDocument);
      if (!domainRoom) throw new Error('Room not created');

      return domainRoom;
    } catch (err) {
      throw err;
    }
  }

  public async exists(room: Room): Promise<boolean> {
    const query = { domainId: room.id } as FilterQuery<IRoomPersistence & Document>;

    const roomDocument = await this.roomSchema.findOne(query);

    return !!roomDocument === true;
  }
}
