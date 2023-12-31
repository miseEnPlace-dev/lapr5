import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";

export interface IRequestService {
  getAllRequests(
    filter?: "state" | "userId",
    value?: string,
    page?: number,
    count?: number
  ): Promise<IPaginationDTO<Request>>;
  getMyRequests(
    page?: number,
    count?: number
  ): Promise<IPaginationDTO<Request>>;
  createSurveillanceRequest(
    request: RequestSurveillance
  ): Promise<RequestSurveillance>;
  createPickAndDeliveryRequest(
    request: RequestPickAndDelivery
  ): Promise<RequestPickAndDelivery>;
  acceptRequest(id: string, deviceCode: string): Promise<void>;
  rejectRequest(id: string): Promise<void>;
  getRequestsByType(
    capability: string,
    page?: number,
    limit?: number
  ): Promise<IPaginationDTO<Request>>;
}
