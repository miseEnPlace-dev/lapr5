import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Request } from "@/model/Request";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";
import { Sequence } from "@/model/Sequence";
import { Task } from "@/model/Task";
import { List } from "lodash";

export interface ITaskService {
  getTasks(
    page?: number,
    count?: number
  ): Promise<Task[]>;
  createTask(
    requestId: string,
    deviceId: string,
  ): Promise<Task>;
}
