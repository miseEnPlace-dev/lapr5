export interface Request {
  id?: string;
  type: string;
  userId: string;
  description: string;
  state?: string;
  startCoordinateX: number;
  startCoordinateY: number;
  endCoordinateX: number;
  endCoordinateY: number;
  requestedAt?: string;
}
