import { IUserDTO } from '@/dto/IUserDTO';
import { IDeviceDTO } from './IDeviceDTO';

export interface ITaskDTO {
  userName: string;
  phoneNumber: string;
  floorId: string;
  description: string;
  id: string;
  createdAt: string;
  requestId: string;
  type: ['surveillance' | 'pick_delivery'];
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  userId: string;
  user: IUserDTO | null;
  deviceId: string;
  device: IDeviceDTO | null;
}
