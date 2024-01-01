import { Device } from "./Device";
import { User } from "./User";

export interface Task {
  username: string;
  phoneNumber: string;
  floorId?: string;
  startFloorCode?: string;
  endFloorCode?: string;
  description: string;
  id: string;
  createdAt: string;
  type: "pick_delivery" | "surveillance";
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  user: User;
  device: Device;
}
