import { IPaginationDTO } from '@/dto/IPaginationDTO';
import { IRequestDTO } from '@/dto/IRequestDTO';

export interface IRequestService {
  getRequests(
    filter?: string,
    value?: string,
    userId?: string,
    page?: string,
    limit?: string
  ): Promise<IPaginationDTO<IRequestDTO>>;
  getPDRequests(page?: string, limit?: string): Promise<IPaginationDTO<IRequestDTO>>;
  getSVRequests(page?: string, limit?: string): Promise<IPaginationDTO<IRequestDTO>>;
  createSurveillance(body: unknown): Promise<IRequestDTO>;
  createPickDelivery(body: unknown): Promise<IRequestDTO>;
  acceptRequest(id: string): Promise<IRequestDTO>;
  rejectRequest(id: string): Promise<IRequestDTO>;
}
