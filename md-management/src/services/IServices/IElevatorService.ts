import { Result } from '../../core/logic/Result';
import { IElevatorDTO } from '../../dto/IElevatorDTO';

export default interface IElevatorService {
  createElevator(ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
}
