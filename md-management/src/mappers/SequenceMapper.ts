import { ISequenceDTO } from '@/dto/ISequenceDTO';
import { ISequenceResponseDTO } from '@/dto/ISequenceResponseDTO';

export class SequenceMapper {
  static map(sequence: ISequenceResponseDTO): ISequenceDTO {
    return {
      tasks: sequence.tasks.map(task => ({
        id: task.id.value,
        startCoordinateX: task.startCoordinateX,
        startCoordinateY: task.startCoordinateY,
        endCoordinateX: task.endCoordinateX,
        endCoordinateY: task.endCoordinateY,
        description: task.description.value,
        type: task.deliveryRoomId ? 'pick_delivery' : 'surveillance',
        endFloorCode: task.floorId ? task.floorId.value : task.startFloorCode!,
        startFloorCode: task.floorId ? task.floorId.value : task.endFloorCode!
      })),
      time: sequence.time,
      path: sequence.path
    };
  }
}
