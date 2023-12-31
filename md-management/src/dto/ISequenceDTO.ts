export interface ISequenceDTO {
  tasks: {
    id: string;
    startCoordinateX: number;
    startCoordinateY: number;
    endCoordinateX: number;
    endCoordinateY: number;
    startFloorCode: string;
    endFloorCode: string;
    description: string;
    type: 'pick_delivery' | 'surveillance';
    userId: string;
  }[];
  time: number;
  path: {
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
  };
}
