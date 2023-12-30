import { ISequenceDTO } from '@/dto/ISequenceDTO';

export interface ITaskService {
  getTaskSequence(): Promise<ISequenceDTO>;
}
