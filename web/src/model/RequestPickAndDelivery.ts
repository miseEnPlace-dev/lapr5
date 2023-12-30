import { Request } from './Request';

export interface RequestPickAndDelivery extends Request {
  pickupUserName: string;
  pickupUserPhoneNumber: string;
  deliveryUserName: string;
  deliveryUserPhoneNumber: string;
  pickupRoomId: string;
  deliveryRoomId: string;
  confirmationCode: string;
  startFloorCode: string;
  endFloorCode: string
}
