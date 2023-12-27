import { Request } from "./Request";

export interface RequestSurveillance extends Request {
  userName: string;
  phoneNumber?: string;
  floorId: string;
}
