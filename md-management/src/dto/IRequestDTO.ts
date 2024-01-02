import { IUserDTO } from '@/dto/IUserDTO';

interface IRequest {
  id: string;
  type: string;
  userId: string;
  user: IUserDTO | null;
  state: ['Pending' | 'Accepted' | 'Rejected' | 'Executed'];
  requestedAt: string;
}

interface ISVRequest {
  userName: string;
  phoneNumber: string;
  floorId: string;
  description: string;
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  type: 'surveillance';
}

interface IPDRequest {
  description: string;
  pickupUserName: string;
  deliveryUserName: string;
  pickupUserPhoneNumber: string;
  deliveryUserPhoneNumber: string;
  pickupRoomId: string;
  deliveryRoomId: string;
  confirmationCode: string;
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  startFloorCode: string;
  endFloorCode: string;
  type: 'pick_delivery';
}

export type IRequestDTO = IRequest & (ISVRequest | IPDRequest);
