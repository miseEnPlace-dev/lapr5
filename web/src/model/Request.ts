export interface Request {
  userId: string;
  userName: string;
  description: string;
  status?: string;
  createdAt?: string;
  phoneNumber: string;
  floorId?: string;
  pickupUser?: {
    name: string;
    phone: string;
  };
  deliveryUser?: {
    name: string;
    phone: string;
  };
  pickupRoomId?: string;
  deliveryRoomId?: string;
  confirmationCode?: string;
}
