import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { ISequenceDTO } from '@/dto/ISequenceDTO';
import { ITaskDTO } from '@/dto/ITaskDTO';

export interface ITaskService {
  getTasks(deviceId?: string): Promise<IPaginationDTO<ITaskDTO>>;
  getTaskSequence(deviceId: string): Promise<ISequenceDTO>;
  createTask(body: unknown): Promise<ITaskDTO>;
  finishTask(id: string): Promise<ITaskDTO>;
}
