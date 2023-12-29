export interface Request {
  id?: string;
  type: string;
  userId: string;
  description: string;
  state?: string;
  requestedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    state: string;
  };
}
