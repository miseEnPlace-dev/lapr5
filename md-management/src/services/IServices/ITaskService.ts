import { ISequenceDTO } from '@/dto/ISequenceDTO';

export interface ITaskService {
  getTaskSequence(deviceId: string): Promise<ISequenceDTO>;
}
