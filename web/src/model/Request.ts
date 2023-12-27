export interface Request {
  userId: string;
  userName?: string;
  description: string;
  status?: string;
  requestedAt?: string;
  phoneNumber?: string;
  floorId?: string;
  pickupUserName?: string;
  pickupUserPhoneNumber?: string;
  deliveryUserName?: string;
  deliveryUserPhoneNumber?: string;
  pickupRoomId?: string;
  deliveryRoomId?: string;
  confirmationCode?: string;
}
