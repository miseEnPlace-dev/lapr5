export interface ISessionDTO {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nif?: string;
  exp: number;
  iat: number;
}
