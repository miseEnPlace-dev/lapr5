import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IDeviceModelPersistence } from '@/dataschema/IDeviceModelPersistence';
import { DeviceModel } from '@/domain/device-model/device-model';
import { DeviceModelCode } from '@/domain/device-model/deviceModelCode';
import { DeviceModelMapper } from '@/mappers/DeviceModelMapper';
import IDeviceModelRepo from '@/services/IRepos/IDeviceModelRepo';
import { Document, FilterQuery, Model } from 'mongoose';

@Service()
export default class DeviceModelRepo implements IDeviceModelRepo {
  private deviceModelSchema: Model<IDeviceModelPersistence & Document>;
  constructor() {
    this.deviceModelSchema = Container.get(config.schemas.deviceModel.name);
  }

  public async exists(deviceModel: DeviceModel): Promise<boolean> {
    const idX = deviceModel.id;

    const query = { domainId: idX };
    const deviceModelDocument = await this.deviceModelSchema.findOne(
      query as FilterQuery<IDeviceModelPersistence & Document>
    );

    return !!deviceModelDocument;
  }

  public async save(deviceModel: DeviceModel): Promise<DeviceModel> {
    const query = { domainId: deviceModel.id } as FilterQuery<IDeviceModelPersistence & Document>;

    const document = await this.deviceModelSchema.findOne(query);

    try {
      const raw = DeviceModelMapper.toPersistence(deviceModel);

      if (!document) {
        const created = await this.deviceModelSchema.create(raw);
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
    const deviceModelRecord = await this.deviceModelSchema.findOne(
      query as FilterQuery<IDeviceModelPersistence & Document>
    );

    if (deviceModelRecord != null) return DeviceModelMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findByCode(code: DeviceModelCode): Promise<DeviceModel | null> {
    const query: FilterQuery<IDeviceModelPersistence & Document> = { code: code.value };
    const deviceModelRecord = await this.deviceModelSchema.findOne(query);

    if (deviceModelRecord != null) return DeviceModelMapper.toDomain(deviceModelRecord);
    return null;
  }

  public async findAll(): Promise<DeviceModel[]> {
    const records = await this.deviceModelSchema.find();

    const deviceModels: DeviceModel[] = [];

    for (const deviceModelRecord of records) {
      const deviceModel = await DeviceModelMapper.toDomain(deviceModelRecord);
      if (deviceModel) deviceModels.push(deviceModel);
    }

    return deviceModels;
  }
}
