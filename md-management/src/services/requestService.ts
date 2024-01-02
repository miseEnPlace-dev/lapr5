import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';
import { IHttpClient } from './IServices/IHttpClient';
import { IRequestService } from './IServices/IRequestService';
import IUserService from './IServices/IUserService';
import { IRequestDTO } from '@/dto/IRequestDTO';
import config from '@/config';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

@injectable()
export default class RequestService implements IRequestService {
  constructor(
    @inject(TYPES.userService) private userSvc: IUserService,
    @inject(TYPES.httpClient) private httpClient: IHttpClient
  ) {}

  async getRequests(
    filter: string | undefined,
    value: string | undefined,
    userId: string | undefined,
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>> {
    const query = { filter, value, userId, page, limit };
    const data = await this.httpClient.get<IPaginationDTO<IRequestDTO>>(
      `${config.tasksApiUrl}/api/requests`,
      query
    );

    for (const request of data.data) {
      const user = await this.userSvc.findUserById(request.userId);
      request.user = user.isSuccess ? user.getValue() : null;
    }

    return data;
  }

  async getPDRequests(
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>> {
    const query = { page, limit };
    const data = await this.httpClient.get<IPaginationDTO<IRequestDTO>>(
      `${config.tasksApiUrl}/api/requests/pick-delivery`,
      query
    );

    for (const request of data.data) {
      const user = await this.userSvc.findUserById(request.userId);
      request.user = user.isSuccess ? user.getValue() : null;
    }

    return data;
  }

  async getSVRequests(
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>> {
    const query = { page, limit };
    const data = await this.httpClient.get<IPaginationDTO<IRequestDTO>>(
      `${config.tasksApiUrl}/api/requests/surveillance`,
      query
    );

    for (const request of data.data) {
      const user = await this.userSvc.findUserById(request.userId);
      request.user = user.isSuccess ? user.getValue() : null;
    }

    return data;
  }

  async createSurveillance(body: unknown): Promise<IRequestDTO> {
    const data = await this.httpClient.post<IRequestDTO>(
      `${config.tasksApiUrl}/api/requests/surveillance`,
      body
    );

    const user = await this.userSvc.findUserById(data.userId);
    data.user = user.isSuccess ? user.getValue() : null;

    return data;
  }

  async createPickDelivery(body: unknown): Promise<IRequestDTO> {
    const data = await this.httpClient.post<IRequestDTO>(
      `${config.tasksApiUrl}/api/requests/pick-delivery`,
      body
    );

    const user = await this.userSvc.findUserById(data.userId);
    data.user = user.isSuccess ? user.getValue() : null;

    return data;
  }

  async acceptRequest(id: string): Promise<IRequestDTO> {
    const data = await this.httpClient.patch<IRequestDTO>(
      `${config.tasksApiUrl}/api/requests/${id}/accept`
    );
    return data;
  }

  async rejectRequest(id: string): Promise<IRequestDTO> {
    const data = await this.httpClient.patch<IRequestDTO>(
      `${config.tasksApiUrl}/api/requests/${id}/accept`
    );
    return data;
  }
}
