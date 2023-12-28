import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";

export interface IRequestService {
  getAllRequests(): Promise<Request[]>;
  createSurveillanceRequest(request: RequestSurveillance): Promise<RequestSurveillance>;
  createPickAndDeliveryRequest(request: RequestPickAndDelivery): Promise<RequestPickAndDelivery>;
}
