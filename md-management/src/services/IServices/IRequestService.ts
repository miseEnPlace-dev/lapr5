import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { IRequestDTO } from '@/dto/IRequestDTO';

export interface IRequestService {
  getRequests(
    filter: string | undefined,
    value: string | undefined,
    userId: string | undefined,
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>>;

  getPDRequests(
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>>;

  getSVRequests(
    page: string | undefined,
    limit: string | undefined
  ): Promise<IPaginationDTO<IRequestDTO>>;

  createSurveillance(body: unknown): Promise<IRequestDTO>;

  createPickDelivery(body: unknown): Promise<IRequestDTO>;

  acceptRequest(id: string): Promise<IRequestDTO>;

  rejectRequest(id: string): Promise<IRequestDTO>;
}
