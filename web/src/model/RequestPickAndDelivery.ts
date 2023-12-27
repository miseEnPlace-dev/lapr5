import { Request } from './Request';

export interface RequestPickAndDelivery extends Request {
  pickupUserName: string;
  pickupUserPhoneNumber: string;
  deliveryUserName: string;
  deliveryUserPhoneNumber: string;
  pickupRoomId: string;
  deliveryRoomId: string;
  confirmationCode: string;
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  startFloorCode: string;
  endFloorCode: string
}
