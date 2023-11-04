import { Result } from '../../core/logic/Result';
import { IElevatorDTO } from '../../dto/IElevatorDTO';

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>>;
  editElevator(elevatorDTO: IElevatorDTO): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>>;
  getElevatorForBuilding(buildingCode: string): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>>;
}
