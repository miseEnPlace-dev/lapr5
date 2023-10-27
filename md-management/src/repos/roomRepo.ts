import config from '@/config.mjs';
import { IRoomPersistence } from '@/dataschema/IRoomPersistence';
import { FloorCode } from '@/domain/floor/floorCode';
import { Room } from '@/domain/room/room';
import { RoomName } from '@/domain/room/roomName';
import { RoomMapper } from '@/mappers/RoomMapper';
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
        const rawRoom = RoomMapper.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        const roomDomain = await RoomMapper.toDomain(roomCreated);

        if (!roomDomain) throw new Error('Room not created');
        return roomDomain;
      }
      const domainRoom = await RoomMapper.toDomain(roomDocument);
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

  public async findAllRoomsInFloorByCode(floorCode: FloorCode): Promise<Room[] | null> {
    const query = { floorCode } as FilterQuery<IRoomPersistence & Document>;

    const roomRecords = await this.roomSchema.find(
      query as FilterQuery<IRoomPersistence & Document>
    );

    const rooms: Room[] = [];

    for (const roomRecord of roomRecords) {
      const room = await RoomMapper.toDomain(roomRecord);
      if (room) rooms.push(room);
    }

    return rooms;
  }

  public async findByName(name: RoomName): Promise<Room | null> {
    const query: FilterQuery<IRoomPersistence & Document> = { name: name.value };

    const roomRecord = await this.roomSchema.findOne(query);

    if (roomRecord) return RoomMapper.toDomain(roomRecord);
    return null;
  }
}
