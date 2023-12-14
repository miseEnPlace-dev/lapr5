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
import { DeviceCoordinates } from '../../../src/domain/device/deviceCoordinates';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { Floor } from '../../../src/domain/floor/floor';
import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';

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
      isAvailable: true,
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
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
      isAvailable: true,
      initialCoordinates: DeviceCoordinates.create(
        1,
        1,
        FloorCode.create('b1').getValue()
      ).getValue()
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
        isAvailable: true,
        initialCoordinates: DeviceCoordinates.create(
          1,
          1,
          FloorCode.create('b1').getValue()
        ).getValue()
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
      isAvailable: true,
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
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
        isAvailable: true,
        initialCoordinates: DeviceCoordinates.create(
          1,
          1,
          FloorCode.create('b1').getValue()
        ).getValue()
      },
      UniqueEntityID.create('1')
    );

    const floor = Floor.create({
      code: FloorCode.create('b1').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    }).getValue();

    const deviceModelStub = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const floorStub = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(deviceModelStub, 'findByCode').resolves(deviceModel);
    stub(floorStub, 'findByCode').resolves(floor);
    container.unbind(TYPES.deviceModelRepo);
    container.unbind(TYPES.floorRepo);
    container.bind<IDeviceModelRepo>(TYPES.deviceModelRepo).toConstantValue(deviceModelStub);
    container.bind<IFloorRepo>(TYPES.floorRepo).toConstantValue(floorStub);

    const result = await DeviceMapper.toDomain({
      domainId: '1',
      code: '1',
      nickname: 'name',
      modelCode: '1',
      serialNumber: '1',
      isAvailable: true,
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
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
