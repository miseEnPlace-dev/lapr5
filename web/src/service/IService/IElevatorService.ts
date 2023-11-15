import { Elevator } from "../../model/Elevator";

export interface IElevatorService {
  getBuildingElevator(buildingCode: string): Promise<Elevator | null>;
}
