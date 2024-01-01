import 'reflect-metadata';

import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import { BuildingCode } from '../../../src/domain/building/buildingCode';
import { DeviceModel } from '../../../src/domain/deviceModel/deviceModel';
import { DeviceModelBrand } from '../../../src/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '../../../src/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '../../../src/domain/deviceModel/deviceModelName';
import { Floor } from '../../../src/domain/floor/floor';
import { FloorCode } from '../../../src/domain/floor/floorCode';
import { FloorDimensions } from '../../../src/domain/floor/floorDimensions';
import { DeviceMapper } from '../../../src/mappers/DeviceMapper';
import IDeviceModelRepo from '../../../src/services/IRepos/IDeviceModelRepo';
import IDeviceRepo from '../../../src/services/IRepos/IDeviceRepo';
import IDeviceService from '../../../src/services/IServices/IDeviceService';
import DeviceService from '../../../src/services/deviceService';

import { Task } from '../../../src/domain/shared/task';

import { stub } from 'sinon';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';

describe('Device  Service', () => {
  it('createDevice: should return error when code is invalid', async () => {
    const invalidCode = 'invalidCode!@#$%^&*()_+';
    const deviceDTO = {
      code: invalidCode,
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel'
    };

    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const result = await deviceService.createDevice(deviceDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device code must be alphanumeric');
  });

  it('createDevice: should return error when nickname is invalid', async () => {
    const invalidNickName = Array(51)
      .fill('a')
      .join('');
    const deviceDTO = {
      code: '12345',
      nickname: invalidNickName,
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel'
    };

    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const result = await deviceService.createDevice(deviceDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device nickname must be 50 characters or less');
  });

  it('createDevice: should return error when serialNumber is invalid', async () => {
    const invalidSerialNumber = 'invalidSerialNumber!@#$%^&*()_+';
    const deviceDTO = {
      code: '12345',
      nickname: 'name',
      serialNumber: invalidSerialNumber,
      modelCode: 'DeviceModel'
    };

    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const result = await deviceService.createDevice(deviceDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device serial number must be alphanumeric');
  });

  it('createDevice: should return error when description is invalid', async () => {
    const invalidDescription = Array(256)
      .fill('a')
      .join('');
    const deviceDTO = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel',
      description: invalidDescription
    };

    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const result = await deviceService.createDevice(deviceDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device description must be 255 characters or less');
  });

  it('createDevice: should return error when modelCode is invalid', async () => {
    const invalidModelCode = Array(26)
      .fill('a')
      .join('');
    const deviceDTO = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: invalidModelCode
    };

    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const result = await deviceService.createDevice(deviceDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device Model code must be 25 characters or less');
  });

  it('createDevice: should return error when model not found', async () => {
    const deviceDTO = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel'
    };

    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(deviceModelRepo, 'findByCode').resolves(null);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo, floorRepo);
    const result = await deviceService.createDevice(deviceDTO);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Model not found');
  });

  it('createDevice: should throw error when repo throws error', async () => {
    const deviceDTO = {
      code: '12345',
      nickname: 'name',
      id: '1',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel',
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
    };

    const deviceModel = DeviceModel.create({
      code: DeviceModelCode.create(deviceDTO.modelCode).getValue(),
      name: DeviceModelName.create('name').getValue(),
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      type: 'drone'
    }).getValue();

    const floor = Floor.create({
      code: FloorCode.create('b1').getValue(),
      buildingCode: BuildingCode.create('1').getValue(),
      dimensions: FloorDimensions.create(1, 1).getValue()
    }).getValue();

    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    stub(floorRepo, 'findByCode').resolves(floor);
    stub(deviceRepo, 'findByCode').resolves(null);
    stub(deviceModelRepo, 'findByCode').resolves(deviceModel);
    stub(deviceRepo, 'save').throws(new Error('Error'));

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo, floorRepo);
    expect(deviceService.createDevice(deviceDTO)).rejects.toThrow('Error');
  });

  it('inhibitDevice: should inhibit a device', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);

    const deviceModel = DeviceModel.create({
      code: DeviceModelCode.create('DeviceModel').getValue(),
      name: DeviceModelName.create('name').getValue(),
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      type: 'drone'
    }).getValue();

    const device = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      model: deviceModel,
      isAvailable: true,
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
    };

    const expected = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel',
      isAvailable: false,
      initialCoordinates: {
        width: 1,
        depth: 1,
        floorCode: 'b1'
      }
    };

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const deviceService = new DeviceService(deviceRepo, deviceModelRepo, floorRepo);

    stub(deviceRepo, 'findByCode').resolves(device);
    stub(deviceRepo, 'save').resolves(device);
    stub(DeviceMapper, 'toDTO').returns(expected);

    const result = await deviceService.inhibitDevice(device.code);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toStrictEqual(expected);
  });

  it('inhibitDevice: should throw error when repo throws error', async () => {
    const deviceCode = '12345';

    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    stub(deviceRepo, 'findByCode').throws(new Error('Error'));

    const floorRepo = container.get<IFloorRepo>(TYPES.floorRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const deviceService = new DeviceService(deviceRepo, deviceModelRepo, floorRepo);
    expect(deviceService.inhibitDevice(deviceCode)).rejects.toThrow('Error');
  });

  /*it('getDevices: should return all devices if no filters are provided', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const device = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel',
      isAvailable: false
    };

    stub(deviceRepo, 'findRobots').resolves([device]);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    const result = await deviceService.getDevicesRobots(undefined, undefined);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toStrictEqual([device]);
  });

  it('getDevices: should return error when filter is invalid', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    const result = await deviceService.getDevicesRobots('invalidFilter', undefined);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Invalid filter.');
  });

  it('getDevices: should return error when filter is name and value is not provided', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    const result = await deviceService.getDevicesRobots('name', undefined);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Invalid filter.');
  });

  it('getDevices: should return devices when filter is task', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const device = {
      code: '12345',
      nickname: 'name',
      serialNumber: 'DeviceSerialNumber',
      modelCode: 'DeviceModel',
      isAvailable: false
    };

    stub(deviceRepo, 'findByTask').resolves([device]);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    const result = await deviceService.getDevicesRobots('task', 'task');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toStrictEqual([device]);
  });

  it('getDevices: should return error when filter is task and value is not provided', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);

    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    const result = await deviceService.getDevicesRobots('task', undefined);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Value not provided');
  });

  it('getDevices: should return error when repo throws error', async () => {
    const deviceRepo = container.get<IDeviceRepo>(TYPES.deviceRepo);
    stub(deviceRepo, 'findRobots').throws(new Error('Error'));

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    const deviceService = new DeviceService(deviceRepo, deviceModelRepo);
    expect(deviceService.getDevicesRobots(undefined, undefined)).rejects.toThrow('Error');
  });*/
});
