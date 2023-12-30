import { ISequenceDTO } from '@/dto/ISequenceDTO';

export interface IRequestService {
  getTaskSequence(): Promise<ISequenceDTO>;
}
