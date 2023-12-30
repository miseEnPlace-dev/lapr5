import config from '@/config';
import { ISequenceDTO } from '@/dto/ISequenceDTO';
import { ISequenceResponseDTO } from '@/dto/ISequenceResponseDTO';
import { TYPES } from '@/loaders/inversify/types';
import { SequenceMapper } from '@/mappers/SequenceMapper';
import { inject, injectable } from 'inversify';
import { IHttpClient } from './IServices/IHttpClient';
import { IRequestService } from './IServices/IRequestService';

@injectable()
export default class RequestService implements IRequestService {
  constructor(@inject(TYPES.httpClient) private httpClient: IHttpClient) {}

  async getTaskSequence(): Promise<ISequenceDTO> {
    const data = await this.httpClient.get<ISequenceResponseDTO>(
      `${config.tasksApiUrl}/api/requests`
    );

    return SequenceMapper.map(data);
  }
}
