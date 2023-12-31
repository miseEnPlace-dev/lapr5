import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';
import { IHttpClient } from './IServices/IHttpClient';
import { IRequestService } from './IServices/IRequestService';

@injectable()
export default class RequestService implements IRequestService {
  constructor(@inject(TYPES.httpClient) private httpClient: IHttpClient) {}
}
