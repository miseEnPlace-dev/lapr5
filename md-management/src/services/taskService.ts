import config from '@/config';
import { ISequenceDTO } from '@/dto/ISequenceDTO';
import { ISequenceResponseDTO } from '@/dto/ISequenceResponseDTO';
import { TYPES } from '@/loaders/inversify/types';
import { SequenceMapper } from '@/mappers/SequenceMapper';
import { inject, injectable } from 'inversify';
import IDeviceService from './IServices/IDeviceService';
import { IHttpClient } from './IServices/IHttpClient';
import { ITaskService } from './IServices/ITaskService';
import IUserService from './IServices/IUserService';

@injectable()
export default class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.userService) private userService: IUserService,
    @inject(TYPES.deviceService) private deviceService: IDeviceService,
    @inject(TYPES.httpClient) private httpClient: IHttpClient
  ) {}

  async getTaskSequence(deviceId: string): Promise<ISequenceDTO> {
    const data = await this.httpClient.get<ISequenceResponseDTO>(
      `${config.tasksApiUrl}/api/tasks/sequence?deviceId=${deviceId}}`
    );

    const sequence = SequenceMapper.map(data);

    for (const task of sequence.tasks) {
      const userOrError = await this.userService.findUserById(task.userId);
      if (userOrError.isFailure) throw userOrError.error;

      const deviceOrError = await this.deviceService.findById(task.deviceId);
      if (deviceOrError.isFailure) throw deviceOrError.error;

      task.user = userOrError.getValue();
      task.device = deviceOrError.getValue();
    }

    return sequence;
  }
}
