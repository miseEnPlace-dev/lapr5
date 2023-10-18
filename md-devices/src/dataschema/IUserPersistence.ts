export interface IUserPersistence {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  salt: string;
  role: string;
}
