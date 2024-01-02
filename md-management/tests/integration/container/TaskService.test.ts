import 'reflect-metadata';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IDeviceService from '../../../src/services/IServices/IDeviceService';
import { IHttpClient } from '../../../src/services/IServices/IHttpClient';
import { ITaskService } from '../../../src/services/IServices/ITaskService';
import IUserService from '../../../src/services/IServices/IUserService';

import sinon, { stub } from 'sinon';
import { beforeEach, describe, expect, it } from 'vitest';
import { Result } from '../../../src/core/logic/Result';
import { IUserDTO } from '../../../src/dto/IUserDTO';

describe('TaskService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("should throw error if user id doesn't have a match", async () => {
    const userService = container.get<IUserService>(TYPES.userService);
    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const httpClient = container.get<IHttpClient>(TYPES.httpClient);

    const deviceDTO = {
      name: 'Device Example',
      description: 'dd',
      id: '1',
      state: 'active',
      floorId: 'b2',
      type: 'surveillance'
    };

    stub(httpClient, 'get').resolves({
      tasks: [
        {
          userName: 'User Example',
          phoneNumber: '912345678',
          floorId: 'b2',
          description: 'dd',
          id: '1',
          createdAt: '12/31/2023 6:40:44PM',
          requestId: '1',
          deviceId: '1',
          type: 'surveillance',
          startCoordinateX: 5,
          startCoordinateY: 21,
          endCoordinateX: 6,
          endCoordinateY: 13,
          userId: '1'
        }
      ],
      time: 1,
      path: [
        {
          taskId: '1',
          route: []
        }
      ]
    });

    stub(userService, 'findUserById').resolves(Result.fail<IUserDTO>('User not found'));
    stub(deviceService, 'findById').resolves(Result.ok(deviceDTO));

    container.rebind<IHttpClient>(TYPES.httpClient).toConstantValue(httpClient);
    container.rebind<IUserService>(TYPES.userService).toConstantValue(userService);
    container.rebind<IDeviceService>(TYPES.deviceService).toConstantValue(deviceService);

    const taskService = container.get<ITaskService>(TYPES.taskService);

    expect(() => taskService.getTaskSequence('1')).rejects.toThrow('User not found');
  });

  it("should throw error if device id doesn't have a match", async () => {
    const userService = container.get<IUserService>(TYPES.userService);
    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const httpClient = container.get<IHttpClient>(TYPES.httpClient);

    const userDTO = {
      email: 'email@isep.ipp.pt',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '912345678',
      role: 'role',
      id: '1',
      state: 'active'
    };

    stub(httpClient, 'get').resolves({
      tasks: [
        {
          userName: 'User Example',
          phoneNumber: '912345678',
          floorId: 'b2',
          description: 'dd',
          id: '1',
          createdAt: '12/31/2023 6:40:44PM',
          requestId: '1',
          deviceId: '1',
          type: 'surveillance',
          startCoordinateX: 5,
          startCoordinateY: 21,
          endCoordinateX: 6,
          endCoordinateY: 13,
          userId: '1'
        }
      ],
      time: 1,
      path: [
        {
          taskId: '1',
          route: []
        }
      ]
    });

    stub(userService, 'findUserById').resolves(Result.ok(userDTO));
    stub(deviceService, 'findById').resolves(Result.fail('Device not found'));

    container.rebind<IHttpClient>(TYPES.httpClient).toConstantValue(httpClient);
    container.rebind<IUserService>(TYPES.userService).toConstantValue(userService);
    container.rebind<IDeviceService>(TYPES.deviceService).toConstantValue(deviceService);

    const taskService = container.get<ITaskService>(TYPES.taskService);

    expect(() => taskService.getTaskSequence('1')).rejects.toThrow('Device not found');
  });

  it('should fetch md tasks', async () => {
    const userService = container.get<IUserService>(TYPES.userService);
    const deviceService = container.get<IDeviceService>(TYPES.deviceService);
    const httpClient = container.get<IHttpClient>(TYPES.httpClient);

    const deviceDTO = {
      name: 'Device Example',
      description: 'dd',
      id: '1',
      state: 'active',
      floorId: 'b2',
      type: 'surveillance'
    };

    const userDTO = {
      email: 'email@isep.ipp.pt',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '912345678',
      role: 'role',
      id: '1',
      state: 'active'
    };

    const httpStub = stub(httpClient, 'get').resolves({
      tasks: [
        {
          userName: 'User Example',
          phoneNumber: '912345678',
          floorId: 'b2',
          description: 'dd',
          id: '1',
          createdAt: '12/31/2023 6:40:44PM',
          requestId: '1',
          deviceId: '1',
          type: 'surveillance',
          startCoordinateX: 5,
          startCoordinateY: 21,
          endCoordinateX: 6,
          endCoordinateY: 13,
          userId: '1'
        }
      ],
      time: 1,
      path: [
        {
          taskId: '1',
          route: []
        }
      ]
    });

    stub(userService, 'findUserById').resolves(Result.ok(userDTO));
    stub(deviceService, 'findById').resolves(Result.ok(deviceDTO));

    container.rebind<IHttpClient>(TYPES.httpClient).toConstantValue(httpClient);
    container.rebind<IUserService>(TYPES.userService).toConstantValue(userService);
    container.rebind<IDeviceService>(TYPES.deviceService).toConstantValue(deviceService);

    const taskService = container.get<ITaskService>(TYPES.taskService);

    await taskService.getTaskSequence('1');

    expect(httpStub.calledOnce);
    expect(httpStub.calledWith('http://localhost:7000/api/tasks/sequence?deviceId=1'));
  });
});
