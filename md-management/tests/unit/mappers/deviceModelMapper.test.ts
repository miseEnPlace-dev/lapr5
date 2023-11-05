import { describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { DeviceModel } from '../../../src/domain/deviceModel/deviceModel';
import { DeviceModelBrand } from '../../../src/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '../../../src/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '../../../src/domain/deviceModel/deviceModelName';
import { Task } from '../../../src/domain/shared/task';
import { DeviceModelMapper } from '../../../src/mappers/DeviceModelMapper';

describe('Device Model Mapper', () => {
  it('should map a device model to a dto', () => {
    const deviceModelDTO = {
      code: '1',
      brand: 'brand',
      name: 'name',
      capabilities: ['pick_delivery'],
      type: 'drone'
    };

    const deviceModel = DeviceModel.create({
      code: DeviceModelCode.create('1').getValue(),
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      name: DeviceModelName.create('name').getValue(),
      type: 'drone'
    });

    const result = DeviceModelMapper.toDTO(deviceModel.getValue());

    expect(result).toEqual(deviceModelDTO);
  });

  it('should map a device model to persistence', () => {
    const deviceModel = DeviceModel.create(
      {
        code: DeviceModelCode.create('1').getValue(),
        brand: DeviceModelBrand.create('brand').getValue(),
        capabilities: [Task.create('pick_delivery').getValue()],
        name: DeviceModelName.create('name').getValue(),
        type: 'drone'
      },
      UniqueEntityID.create('1')
    );

    const result = DeviceModelMapper.toPersistence(deviceModel.getValue());

    expect(result).toEqual({
      domainId: '1',
      code: '1',
      brand: 'brand',
      name: 'name',
      capabilities: ['pick_delivery'],
      type: 'drone'
    });
  });

  it('should map a device model from persistence', async () => {
    const deviceModel = DeviceModel.create(
      {
        code: DeviceModelCode.create('1').getValue(),
        brand: DeviceModelBrand.create('brand').getValue(),
        capabilities: [Task.create('pick_delivery').getValue()],
        name: DeviceModelName.create('name').getValue(),
        type: 'drone'
      },
      UniqueEntityID.create('1')
    );

    const result = await DeviceModelMapper.toDomain({
      domainId: '1',
      code: '1',
      brand: 'brand',
      name: 'name',
      capabilities: ['pick_delivery'],
      type: 'drone'
    });

    expect(result).toEqual(deviceModel.getValue());
  });
});
