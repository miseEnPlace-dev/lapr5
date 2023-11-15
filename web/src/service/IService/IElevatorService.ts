import { Elevator } from "../../model/Elevator";

export interface IElevatorService {
  getBuildingElevator(buildingCode: string): Promise<Elevator | null>;
  createElevator(buildingCode: string, elevator: Elevator): Promise<Elevator>;
  updateElevator(buildingCode: string, elevator: Elevator): Promise<Elevator>;
}
