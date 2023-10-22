import config from '@/config.mjs';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { ElevatorMap } from '@/mappers/ElevatorMap';
import Container, { Service } from 'typedi';
import { Result } from '../core/logic/Result';
import { Elevator } from '../domain/elevator/elevator';
import IElevatorService from './IServices/IElevatorService';

@Service()
export default class ElevatorService implements IElevatorService {
  private buildingRepo: IElevatorRepo;
  constructor() {
    this.buildingRepo = Container.get(config.repos.building.name);
  }

  public async createElevator(ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const buildingOrError = Elevator.create(ElevatorDTO);

      if (buildingOrError.isFailure) return Result.fail<IElevatorDTO>(buildingOrError.errorValue());

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const ElevatorDTOResult = ElevatorMap.toDTO(buildingResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(ElevatorDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
