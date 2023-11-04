import 'reflect-metadata';

import { stub } from 'sinon';
import { describe, expect, it } from 'vitest';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';

import IDeviceModelRepo from '../../../src/services/IRepos/IDeviceModelRepo';
import IDeviceModelService from '../../../src/services/IServices/IDeviceModelService';
import DeviceModelService from '../../../src/services/deviceModelService';

describe('Device Model Service', () => {
  it('createDeviceModel: should return error when code is invalid', async () => {
    const invalidCode = Array(26)
      .fill('a')
      .join('');
    const deviceModelDTO = {
      code: invalidCode,
      name: 'DeviceModel 1',
      brand: 'Brand 1',
      capabilities: ['Capability 1'],
      type: 'drone'
    };

    const deviceModelService = container.get<IDeviceModelService>(TYPES.deviceModelService);
    const result = await deviceModelService.createDeviceModel(deviceModelDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device Model code must be 25 characters or less');
  });

  it('createDeviceModel: should return error when name is invalid', async () => {
    const invalidName = Array(101)
      .fill('a')
      .join('');
    const deviceModelDTO = {
      code: '12345',
      name: invalidName,
      brand: 'Brand 1',
      capabilities: ['Capability 1'],
      type: 'drone'
    };

    const deviceModelService = container.get<IDeviceModelService>(TYPES.deviceModelService);
    const result = await deviceModelService.createDeviceModel(deviceModelDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device Model name must be 100 characters or less');
  });

  it('createDeviceModel: should return error when brand is invalid', async () => {
    const invalidBrand = Array(51)
      .fill('a')
      .join('');
    const deviceModelDTO = {
      code: '12345',
      name: 'DeviceModel 1',
      brand: invalidBrand,
      capabilities: ['Capability 1'],
      type: 'drone'
    };

    const deviceModelService = container.get<IDeviceModelService>(TYPES.deviceModelService);
    const result = await deviceModelService.createDeviceModel(deviceModelDTO);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device Model brand must be 50 characters or less');
  });

  it('createDeviceModel: should create a new Device Model', async () => {
    const deviceModelDTO = {
      code: '12345',
      name: 'DeviceModel 1',
      brand: 'Brand 1',
      capabilities: ['pick_delivery'],
      type: 'drone'
    };

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves(deviceModelDTO);
    stub(deviceModelRepo, 'findByCode').resolves(null);
    const deviceModelService = new DeviceModelService(deviceModelRepo);
    const result = await deviceModelService.createDeviceModel(deviceModelDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual(deviceModelDTO);
  });

  it('createDeviceModel: should not create a deviceModel when already exists', async () => {
    const deviceModelDTO = {
      code: '12345',
      name: 'DeviceModel 1',
      brand: 'Brand 1',
      capabilities: ['pick_delivery'],
      type: 'drone'
    };

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').resolves(deviceModelDTO);
    stub(deviceModelRepo, 'findByCode').resolves(deviceModelDTO);
    const deviceModelService = new DeviceModelService(deviceModelRepo);
    const result = await deviceModelService.createDeviceModel(deviceModelDTO);

    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe('Device Model already exists');
  });

  it('createDeviceModel: should throw error when repo throws error', async () => {
    const deviceModelDTO = {
      code: '12345',
      name: 'DeviceModel 1',
      brand: 'Brand 1',
      capabilities: ['pick_delivery'],
      type: 'drone'
    };

    const deviceModelRepo = container.get<IDeviceModelRepo>(TYPES.deviceModelRepo);
    stub(deviceModelRepo, 'save').throws(new Error('Error'));
    stub(deviceModelRepo, 'findByCode').resolves(null);
    const deviceModelService = new DeviceModelService(deviceModelRepo);
    expect(deviceModelService.createDeviceModel(deviceModelDTO)).rejects.toThrow('Error');
  });
});
