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
import { ITaskDTO } from '@/dto/ITaskDTO';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

@injectable()
export default class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.userService) private userService: IUserService,
    @inject(TYPES.deviceService) private deviceService: IDeviceService,
    @inject(TYPES.httpClient) private httpClient: IHttpClient
  ) {}

  async getTasks(deviceId?: string): Promise<IPaginationDTO<ITaskDTO>> {
    const data = await this.httpClient.get<IPaginationDTO<ITaskDTO>>(
      `${config.tasksApiUrl}/api/tasks`,
      { filter: 'device', value: deviceId }
    );

    const tasks: ITaskDTO[] = [];

    for (const task of data.data) {
      const userOrError = await this.userService.findUserById(task.userId);
      if (userOrError.isFailure) throw userOrError.error;

      const deviceOrError = await this.deviceService.findById(task.deviceId);
      if (deviceOrError.isFailure) throw deviceOrError.error;

      task.user = userOrError.getValue();
      task.device = deviceOrError.getValue();

      tasks.push(task);
    }

    return { ...data, data: tasks };
  }

  async getTaskSequence(deviceId: string): Promise<ISequenceDTO> {
    const data = await this.httpClient.get<ISequenceResponseDTO>(
      `${config.tasksApiUrl}/api/tasks/sequence?deviceId=${deviceId}`
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

  async createTask(body: unknown): Promise<ITaskDTO> {
    return await this.httpClient.post<ITaskDTO>(`${config.tasksApiUrl}/api/tasks`, body);
  }

  async finishTask(id: string): Promise<ITaskDTO> {
    return await this.httpClient.patch<ITaskDTO>(`${config.tasksApiUrl}/api/tasks/${id}`);
  }
}
