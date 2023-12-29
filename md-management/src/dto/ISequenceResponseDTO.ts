export interface ISequenceResponseDTO {
  tasks: {
    description: {
      value: string;
    };
    userName?: {
      name: string;
    };
    userPhoneNumber?: {
      phoneNumber: string;
    };
    floorId?: {
      value: string;
    };
    startCoordinateX: number;
    startCoordinateY: number;
    endCoordinateX: number;
    endCoordinateY: number;
    id: {
      value: string;
    };
    confirmationCode?: {
      code: string;
    };
    pickupUserName?: {
      name: string;
    };
    deliveryUserName?: {
      name: string;
    };
    pickupUserPhoneNumber?: {
      phoneNumber: string;
    };
    deliveryUserPhoneNumber?: {
      phoneNumber: string;
    };
    pickupRoomId?: {
      value: string;
    };
    deliveryRoomId?: {
      value: string;
    };
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
