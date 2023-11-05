import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Device } from '../../../src/domain/device/device';
import { DeviceCode } from '../../../src/domain/device/deviceCode';
import { DeviceNickname } from '../../../src/domain/device/deviceNickname';
import { container } from '../../../src/loaders/inversify';
import { DeviceMapper } from '../../../src/mappers/DeviceMapper';
import { DeviceModelCode } from '../../../src/domain/deviceModel/deviceModelCode';
import { DeviceModel } from '../../../src/domain/deviceModel/deviceModel';
import { DeviceModelName } from '../../../src/domain/deviceModel/deviceModelName';
import { DeviceModelBrand } from '../../../src/domain/deviceModel/deviceModelBrand';
import { Task } from '../../../src/domain/shared/task';
import { TYPES } from '../../../src/loaders/inversify/types';
import IDeviceModelRepo from '../../../src/services/IRepos/IDeviceModelRepo';

import { stub } from 'sinon';

describe('Device Mapper', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should map device to a dto', () => {
    const deviceDTO = {
      code: '1',
      nickname: 'name',
      modelCode: '1',
      serialNumber: '1',
      isAvailable: true
    };

    const device = Device.create({
      code: DeviceCode.create('1').getValue(),
      nickname: DeviceNickname.create('name').getValue(),
      model: DeviceModel.create({
        code: DeviceModelCode.create('1').getValue(),
        type: 'robot',
        name: DeviceModelName.create('name').getValue(),
        brand: DeviceModelBrand.create('brand').getValue(),
        capabilities: [Task.create('pick_delivery').getValue()]
      }).getValue(),
      serialNumber: DeviceCode.create('1').getValue(),
      isAvailable: true
    });

    const result = DeviceMapper.toDTO(device.getValue());

    expect(result).toEqual(deviceDTO);
  });

  it('should map a device to persistence', () => {
    const device = Device.create(
      {
        code: DeviceCode.create('1').getValue(),
        nickname: DeviceNickname.create('name').getValue(),
        model: DeviceModel.create({
          code: DeviceModelCode.create('1').getValue(),
          type: 'robot',
          name: DeviceModelName.create('name').getValue(),
          brand: DeviceModelBrand.create('brand').getValue(),
          capabilities: [Task.create('pick_delivery').getValue()]
        }).getValue(),
        serialNumber: DeviceCode.create('1').getValue(),
        isAvailable: true
      },
      UniqueEntityID.create('1')
    );

    const result = DeviceMapper.toPersistence(device.getValue());

    expect(result).toEqual({
      domainId: '1',
      code: '1',
      nickname: 'name',
      modelCode: '1',
      serialNumber: '1',
      isAvailable: true
    });
  });

  it('should map a device from persistence', async () => {
    const deviceModel = DeviceModel.create({
      code: DeviceModelCode.create('1').getValue(),
      type: 'robot',
      name: DeviceModelName.create('name').getValue(),
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()]
    }).getValue();

    const device = Device.create(
      {
        code: DeviceCode.create('1').getValue(),
        nickname: DeviceNickname.create('name').getValue(),
        model: deviceModel,
        serialNumber: DeviceCode.create('1').getValue(),
        isAvailable: true
      },
      UniqueEntityID.create('1')
    );

    const deviceModelStub = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelStub, 'findByCode').resolves(deviceModel);
    container.unbind(TYPES.deviceModelRepo);
    container.bind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelStub);

    const result = await DeviceMapper.toDomain({
      domainId: '1',
      code: '1',
      nickname: 'name',
      modelCode: '1',
      serialNumber: '1',
      isAvailable: true
    });

    expect(result).toEqual(device.getValue());
  });

  it('should throw an error when device model is not found', async () => {
    const deviceRepoStub = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceRepoStub, 'findByCode').resolves(null);
    container.unbind(TYPES.deviceModelRepo);
    container.bind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceRepoStub);

    try {
      await DeviceMapper.toDomain({
        domainId: '1',
        code: '1',
        nickname: 'name',
        modelCode: '1',
        serialNumber: '1',
        isAvailable: true
      });
    } catch (error) {
      expect(error.message).toEqual('Model not found');
    }
  });
});
