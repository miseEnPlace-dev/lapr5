export interface IUserPersistence {
  domainId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  nif?: string;
  salt: string;
  role: string;
  state: string;
}
