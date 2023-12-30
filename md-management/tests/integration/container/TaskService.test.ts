import 'reflect-metadata';

import sinon, { SinonStub, stub } from 'sinon';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ISequenceDTO } from '../../../src/dto/ISequenceDTO';
import { ISequenceResponseDTO } from '../../../src/dto/ISequenceResponseDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import { SequenceMapper } from '../../../src/mappers/SequenceMapper';
import { IHttpClient } from '../../../src/services/IServices/IHttpClient';
import { ITaskService } from '../../../src/services/IServices/ITaskService';
import TaskService from '../../../src/services/taskService';

describe('TaskService', () => {
  let httpClient: IHttpClient;
  let taskService: ITaskService;
  let mapStub: SinonStub;

  beforeEach(() => {
    httpClient = container.get<IHttpClient>(TYPES.httpClient);

    taskService = new TaskService(httpClient);
    mapStub = stub(SequenceMapper, 'map');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return the mapped sequence data', async () => {
    const sequenceResponse: ISequenceResponseDTO = {
      tasks: [
        {
          id: {
            value: '32fe9210-26ea-4833-a4e4-899a54b4af94'
          },
          startCoordinateX: 8,
          startCoordinateY: 18,
          endCoordinateX: 8,
          endCoordinateY: 15,
          description: {
            value: 'Description'
          },
          endFloorCode: 'b1',
          startFloorCode: 'b1'
        }
      ],
      time: 43.242640687119284,
      path: [
        {
          taskId: '32fe9210-26ea-4833-a4e4-899a54b4af94',
          route: [
            {
              floor: 'b1',
              x: 8,
              y: 18
            },
            {
              floor: 'b1',
              x: 8,
              y: 17
            },
            {
              floor: 'b1',
              x: 8,
              y: 16
            },
            {
              floor: 'b1',
              x: 8,
              y: 15
            },
            {
              floor1: 'b1',
              floor2: 'b1',
              type: 'elevator'
            }
          ]
        }
      ]
    };

    const expectedSequence: ISequenceDTO = {
      tasks: [
        {
          id: '32fe9210-26ea-4833-a4e4-899a54b4af94',
          startCoordinateX: 8,
          startCoordinateY: 18,
          endCoordinateX: 8,
          endCoordinateY: 15,
          description: 'Description',
          type: 'surveillance',
          endFloorCode: 'b1',
          startFloorCode: 'b1'
        }
      ],
      time: 43.242640687119284,
      path: {
        '32fe9210-26ea-4833-a4e4-899a54b4af94': [
          {
            floor: 'b1',
            x: 8,
            y: 18
          },
          {
            floor: 'b1',
            x: 8,
            y: 17
          },
          {
            floor: 'b1',
            x: 8,
            y: 16
          },
          {
            floor: 'b1',
            x: 8,
            y: 15
          }
        ]
      }
    };
    stub(httpClient, 'get').resolves(sequenceResponse);
    mapStub.returns(expectedSequence);

    const result = await taskService.getTaskSequence();

    expect(result).toEqual(expectedSequence);
  });

  /* it("should communicate with the tasks api's sequence endpoint", async () => {
    await taskService.getTaskSequence();
    const getSpy = spy(httpClient, 'get');

    assert.calledOnce(getSpy);
  }, 1000000); */
});
