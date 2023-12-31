import { Sequence } from "@/model/Sequence";
import { Task } from "@/model/Task";

export interface ITaskService {
  getTasks(page?: number, count?: number): Promise<Task[]>;
  createTask(requestId: string, deviceId: string): Promise<Task>;
  getSequence(): Promise<Sequence>;
  finishTask(id: string): Promise<void>;
}
