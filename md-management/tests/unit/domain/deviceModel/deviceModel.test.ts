import { describe, expect, it } from 'vitest';

import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { DeviceModel } from '../../../../src/domain/deviceModel/deviceModel';
import { DeviceModelBrand } from '../../../../src/domain/deviceModel/deviceModelBrand';
import { DeviceModelCode } from '../../../../src/domain/deviceModel/deviceModelCode';
import { DeviceModelName } from '../../../../src/domain/deviceModel/deviceModelName';
import { Task } from '../../../../src/domain/shared/task';

describe('Device Model', () => {
  it('should fail if some of the args is undefined', () => {
    const result = DeviceModel.create({
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      name: DeviceModelName.create('name').getValue(),
      code: (undefined as unknown) as DeviceModelCode,
      type: 'robot'
    });
    expect(result.isFailure).toBe(true);
  });

  it('should fail if some of the args is null', () => {
    const result = DeviceModel.create({
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      name: DeviceModelName.create('name').getValue(),
      code: (null as unknown) as DeviceModelCode,
      type: 'robot'
    });
    expect(result.isFailure).toBe(true);
  });

  it('should create a new device model with given id', () => {
    const result = DeviceModel.create(
      {
        brand: DeviceModelBrand.create('brand').getValue(),
        capabilities: [Task.create('pick_delivery').getValue()],
        name: DeviceModelName.create('name').getValue(),
        code: DeviceModelCode.create('code').getValue(),
        type: 'robot'
      },
      UniqueEntityID.create('id')
    );
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString()).toBe('id');
  });

  it('should generate a new uuid if no id is given', () => {
    const result = DeviceModel.create({
      brand: DeviceModelBrand.create('brand').getValue(),
      capabilities: [Task.create('pick_delivery').getValue()],
      name: DeviceModelName.create('name').getValue(),
      code: DeviceModelCode.create('code').getValue(),
      type: 'robot'
    });
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.toString().length).toBe(36);
  });
});
