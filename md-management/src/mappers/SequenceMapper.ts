import { ISequenceDTO } from '@/dto/ISequenceDTO';
import { ISequenceResponseDTO } from '@/dto/ISequenceResponseDTO';

export class SequenceMapper {
  static map(sequence: ISequenceResponseDTO): ISequenceDTO {
    const path: {
      [key: string]: [
        | {
            floor: string;
            x: number;
            y: number;
          }
        | {
            floor1: string;
            floor2: string;
            type: string;
          }
      ];
    } = {};

    for (const task of sequence.path) {
      path[task.taskId] = task.route;
    }

    return {
      tasks: sequence.tasks.map(task => ({
        id: task.id,
        startCoordinateX: task.startCoordinateX,
        startCoordinateY: task.startCoordinateY,
        endCoordinateX: task.endCoordinateX,
        endCoordinateY: task.endCoordinateY,
        description: task.description,
        type: task.deliveryRoomId ? 'pick_delivery' : 'surveillance',
        endFloorCode: task.floorId ? task.floorId : task.startFloorCode!,
        startFloorCode: task.floorId ? task.floorId : task.endFloorCode!,
        userId: task.userId
      })),
      time: sequence.time,
      path
    };
  }
}
