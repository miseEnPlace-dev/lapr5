import 'reflect-metadata';

import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import { IRequestService } from '../../../src/services/IServices/IRequestService';
import { IHttpClient } from '../../../src/services/IServices/IHttpClient';
import IUserService from '../../../src/services/IServices/IUserService';

import sinon, { stub } from 'sinon';
import { beforeEach, describe, expect, it } from 'vitest';
import { Result } from '../../../src/core/logic/Result';

describe('RequestService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should fetch md tasks', async () => {
    const userService = container.get<IUserService>(TYPES.userService);
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

    const httpStub = stub(httpClient, 'get').resolves({
      meta: {
        page: 1,
        limit: 1,
        total: 1,
        totalPages: 1
      },
      data: [
        {
          userName: 'User Example',
          phoneNumber: '912345678',
          floorId: 'b2',
          description: 'Make it in time',
          id: 'bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed',
          type: 'surveillance',
          userId: 'c7dcd734-66f7-4d9c-8ba2-887923d41401',
          state: 'Accepted',
          requestedAt: '1/2/2024 1:33:18 AM',
          startCoordinateX: 6,
          startCoordinateY: 19,
          endCoordinateX: 5,
          endCoordinateY: 21,
          user: {
            id: 'c7dcd734-66f7-4d9c-8ba2-887923d41401',
            firstName: 'User',
            lastName: 'Example',
            email: 'user@isep.ipp.pt',
            phoneNumber: '912345678',
            nif: '123456789',
            password: '',
            role: 'user',
            state: 'active'
          }
        }
      ]
    });

    stub(userService, 'findUserById').resolves(Result.ok(userDTO));

    container.rebind<IHttpClient>(TYPES.httpClient).toConstantValue(httpClient);
    container.rebind<IUserService>(TYPES.userService).toConstantValue(userService);

    const requestService = container.get<IRequestService>(TYPES.requestService);

    const res = await requestService.getRequests(
      'state',
      'accepted',
      undefined,
      undefined,
      undefined
    );

    expect(httpStub.calledOnce);
    expect(httpStub.calledWith('http://localhost:7000/api/requests?filter=state&value=accepted'));
    expect(res.data.length).toBe(1);
  });

  it('should add null user if user not found', async () => {
    const userService = container.get<IUserService>(TYPES.userService);
    const httpClient = container.get<IHttpClient>(TYPES.httpClient);

    const httpStub = stub(httpClient, 'get').resolves({
      meta: {
        page: 1,
        limit: 1,
        total: 1,
        totalPages: 1
      },
      data: [
        {
          userName: 'User Example',
          phoneNumber: '912345678',
          floorId: 'b2',
          description: 'Make it in time',
          id: 'bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed',
          type: 'surveillance',
          userId: 'c7dcd734-66f7-4d9c-8ba2-887923d41401',
          state: 'Accepted',
          requestedAt: '1/2/2024 1:33:18 AM',
          startCoordinateX: 6,
          startCoordinateY: 19,
          endCoordinateX: 5,
          endCoordinateY: 21,
          user: {
            id: 'c7dcd734-66f7-4d9c-8ba2-887923d41401',
            firstName: 'User',
            lastName: 'Example',
            email: 'user@isep.ipp.pt',
            phoneNumber: '912345678',
            nif: '123456789',
            password: '',
            role: 'user',
            state: 'active'
          }
        }
      ]
    });

    stub(userService, 'findUserById').resolves(Result.fail('Error'));

    container.rebind<IHttpClient>(TYPES.httpClient).toConstantValue(httpClient);
    container.rebind<IUserService>(TYPES.userService).toConstantValue(userService);

    const requestService = container.get<IRequestService>(TYPES.requestService);

    const res = await requestService.getRequests(
      'state',
      'accepted',
      undefined,
      undefined,
      undefined
    );

    expect(httpStub.calledOnce);
    expect(httpStub.calledWith('http://localhost:7000/api/requests?filter=state&value=accepted'));
    expect(res.data[0].user).toBe(null);
  });
});
