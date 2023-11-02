import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import { Device } from '@/domain/device/device';
import { DeviceCode } from '@/domain/device/deviceCode';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import deviceSchema from '@/persistence/schemas/deviceSchema';
import IDeviceRepo from '@/services/IRepos/IDeviceRepo';
import { injectable } from 'inversify';
import { Document, FilterQuery, PipelineStage } from 'mongoose';

@injectable()
export default class DeviceRepo implements IDeviceRepo {
  constructor() {}

  public async findRobots(): Promise<Device[]> {
    const deviceRecords = await deviceSchema.find({}).populate({
      path: 'modelCode',
      match: { type: 'robot' }
    });

    const devices: Device[] = [];
    for (const deviceRecord of deviceRecords) {
      const device = await DeviceMapper.toDomain(deviceRecord);
      if (device) devices.push(device);
    }

    return devices;
  }

  public async findByTask(task: string): Promise<Device[] | null> {
    const query: PipelineStage[] = [
      {
        $lookup: {
          from: 'devicemodels',
          localField: 'modelCode',
          foreignField: 'code',
          as: 'model'
        }
      },
      {
        $match: {
          'model.capabilities': task
        }
      }
    ];

    const deviceRecords = await deviceSchema.aggregate(query);

    if (deviceRecords != null) {
      const devices: Device[] = [];
      for (const deviceRecord of deviceRecords) {
        const device = await DeviceMapper.toDomain(deviceRecord);
        if (device) devices.push(device);
      }
      return devices;
    }

    return null;
  }

  public async findByName(name: string): Promise<Device[] | null> {
    const query: PipelineStage[] = [
      {
        $lookup: {
          from: 'devicemodels',
          localField: 'modelCode',
          foreignField: 'code',
          as: 'model'
        }
      },
      {
        $match: {
          'model.name': name
        }
      }
    ];

    const deviceRecords = await deviceSchema.aggregate(query);

    if (deviceRecords != null) {
      const devices: Device[] = [];
      for (const deviceRecord of deviceRecords) {
        const device = await DeviceMapper.toDomain(deviceRecord);
        if (device) devices.push(device);
      }
      return devices;
    }

    return null;
  }

  public async exists(device: Device): Promise<boolean> {
    const idX = device.id;

    const query = { domainId: idX };
    const deviceDocument = await deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    return !!deviceDocument;
  }

  public async save(device: Device): Promise<Device> {
    const query = { domainId: device.id } as FilterQuery<IDevicePersistence & Document>;

    const deviceDocument = await deviceSchema.findOne(query);

    try {
      const raw = DeviceMapper.toPersistence(device);

      if (!deviceDocument) {
        const created = await deviceSchema.create(raw);
        const domainDevice = await DeviceMapper.toDomain(created);

        if (!domainDevice) throw new Error('Device not created');
        return domainDevice;
      }

      deviceDocument.code = raw.code;
      deviceDocument.nickname = raw.nickname;
      deviceDocument.modelCode = raw.modelCode;
      deviceDocument.description = raw.description;
      deviceDocument.serialNumber = raw.serialNumber;
      deviceDocument.isAvailable = raw.isAvailable;

      await deviceDocument.save();
      return device;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Device | null> {
    const query = { domainId };
    const deviceModelRecord = await deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    if (deviceModelRecord != null) return DeviceMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findAll(): Promise<Device[]> {
    const records = await deviceSchema.find();

    const devices: Device[] = [];

    for (const deviceRecord of records) {
      const device = await DeviceMapper.toDomain(deviceRecord);
      if (device) devices.push(device);
    }

    return devices;
  }

  public async findByCode(code: DeviceCode): Promise<Device | null> {
    const query = { code: code.value };
    const deviceModelRecord = await deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    if (deviceModelRecord != null) return DeviceMapper.toDomain(deviceModelRecord);
    return null;
  }
}
