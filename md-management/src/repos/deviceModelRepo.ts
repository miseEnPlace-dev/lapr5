import { Service } from '@freshgum/typedi';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDeviceModelPersistence } from '@/dataschema/IDeviceModelPersistence';
import { DeviceModel } from '@/domain/device-model/device-model';
import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';
import { DeviceModelName } from '@/domain/device-model/deviceModelName';
import { DeviceModelMapper } from '@/mappers/DeviceModelMapper';
import deviceModelSchema from '@/persistence/schemas/deviceModelSchema';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';
import { Document, FilterQuery } from 'mongoose';

@Service([])
export default class DeviceModelRepo implements IDeviceModelRepo {
  constructor() { }

  public async findByName(name: DeviceModelName | string): Promise<DeviceModel | null> {
    const query: FilterQuery<IDeviceModelPersistence & Document> = { name };

    const deviceModelRecord = await deviceModelSchema.findOne(query);

    if (deviceModelRecord) return DeviceModelMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async exists(deviceModel: DeviceModel): Promise<boolean> {
    const idX = deviceModel.id;

    const query = { domainId: idX };
    const deviceModelDocument = await deviceModelSchema.findOne(
      query as FilterQuery<IDeviceModelPersistence & Document>
    );

    return !!deviceModelDocument;
  }

  public async save(deviceModel: DeviceModel): Promise<DeviceModel> {
    const query = { domainId: deviceModel.id } as FilterQuery<IDeviceModelPersistence & Document>;

    const document = await deviceModelSchema.findOne(query);

    try {
      const raw = DeviceModelMapper.toPersistence(deviceModel);

      if (!document) {
        const created = await deviceModelSchema.create(raw);
        const domainDeviceModel = await DeviceModelMapper.toDomain(created);

        if (!domainDeviceModel) throw new Error('DeviceModel not created');
        return domainDeviceModel;
      }

      // there is a document, update it
      document.set(raw);
      await document.save();

      const domainDeviceModel = await DeviceModelMapper.toDomain(document);
      if (!domainDeviceModel) throw new Error('DeviceModel not created');
      return domainDeviceModel;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<DeviceModel | null> {
    const query = { domainId };
    const deviceModelRecord = await deviceModelSchema.findOne(
      query as FilterQuery<IDeviceModelPersistence & Document>
    );

    if (deviceModelRecord != null) return DeviceModelMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findByCode(code: DeviceModelCode | string): Promise<DeviceModel | null> {
    const query: FilterQuery<IDeviceModelPersistence & Document> = { code: code };
    const deviceModelRecord = await deviceModelSchema.findOne(query);

    if (deviceModelRecord != null) return DeviceModelMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findAll(): Promise<DeviceModel[]> {
    const records = await deviceModelSchema.find();

    const deviceModels: DeviceModel[] = [];

    for (const deviceModelRecord of records) {
      const deviceModel = await DeviceModelMapper.toDomain(deviceModelRecord);
      if (deviceModel) deviceModels.push(deviceModel);
    }

    return deviceModels;
  }
}
