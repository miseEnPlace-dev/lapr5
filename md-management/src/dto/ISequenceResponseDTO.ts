export interface ISequenceResponseDTO {
  tasks: {
    description: string;
    userName?: string;
    phoneNumber?: string;
    floorId?: string;
    startCoordinateX: number;
    startCoordinateY: number;
    endCoordinateX: number;
    endCoordinateY: number;
    id: string;
    deviceId: string;
    userId: string;
    confirmationCode?: string;
    pickupUserName?: string;
    deliveryUserName?: string;
    pickupUserPhoneNumber?: string;
    deliveryUserPhoneNumber?: string;
    pickupRoomId?: string;
    deliveryRoomId?: string;
    startFloorCode?: string;
    endFloorCode?: string;
  }[];
  time: number;
  path: {
    taskId: string;
    route: [
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
  }[];
}
