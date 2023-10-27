import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDevicePersistence } from '@/dataschema/IDevicePersistence';
import IDeviceRepo from '@/services/IRepos/IDeviceRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { Device } from '@/domain/device/device';
import { DeviceMapper } from '@/mappers/DeviceMapper';
import { DeviceCode } from '@/domain/device/deviceCode';

@Service()
export default class DeviceRepo implements IDeviceRepo {
  private deviceSchema: Model<IDevicePersistence & Document>;
  constructor() {
    this.deviceSchema = Container.get(config.schemas.device.name);
  }

  public async exists(device: Device): Promise<boolean> {
    const idX = device.id;

    const query = { domainId: idX };
    const deviceDocument = await this.deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    return !!deviceDocument;
  }

  public async save(device: Device): Promise<Device> {
    const query = { domainId: device.id } as FilterQuery<IDevicePersistence & Document>;

    const deviceDocument = await this.deviceSchema.findOne(query);

    try {
      const raw = DeviceMapper.toPersistence(device);

      if (!deviceDocument) {
        const created = await this.deviceSchema.create(raw);
        const domainDevice = await DeviceMapper.toDomain(created);

        if (!domainDevice) throw new Error('Device not created');
        return domainDevice;
      }

      // TODO - Update device

      await deviceDocument.save();
      return device;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Device | null> {
    const query = { domainId };
    const deviceModelRecord = await this.deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    if (deviceModelRecord != null) return DeviceMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findAll(): Promise<Device[]> {
    const records = await this.deviceSchema.find();

    const devices: Device[] = [];

    for (const deviceRecord of records) {
      const device = await DeviceMapper.toDomain(deviceRecord);
      if (device) devices.push(device);
    }

    return devices;
  }

  public async findByCode(code: DeviceCode) {
    const query = { code: code.value };
    const deviceRecord = await this.deviceSchema.findOne(
      query as FilterQuery<IDevicePersistence & Document>
    );

    if (deviceRecord != null) return DeviceMapper.toDomain(deviceRecord);
    return null;
  }
}
