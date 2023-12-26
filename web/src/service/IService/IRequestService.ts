import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";

export interface IRequestService {
  getAllRequests(): Promise<Request[]>;
}
