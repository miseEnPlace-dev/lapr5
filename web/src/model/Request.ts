export interface Request {
  id?: string;
  type: string;
  userId: string;
  description: string;
  state?: string;
  requestedAt?: string;
}
