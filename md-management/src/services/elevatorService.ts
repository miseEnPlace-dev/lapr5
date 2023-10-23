import config from '@/config.mjs';
import { ElevatorBranding } from '@/domain/elevator/elevatorBranding';
import { ElevatorCode } from '@/domain/elevator/elevatorCode';
import { ElevatorDescription } from '@/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '@/domain/elevator/elevatorSerialNumber';
import { Floor } from '@/domain/floor/floor';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { ElevatorMap } from '@/mappers/ElevatorMap';
import Container, { Service } from 'typedi';
import { Result } from '../core/logic/Result';
import { Elevator } from '../domain/elevator/elevator';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IElevatorService from './IServices/IElevatorService';

@Service()
export default class ElevatorService implements IElevatorService {
  private buildingRepo: IBuildingRepo;
  private floorRepo: IFloorRepo;
  constructor() {
    this.buildingRepo = Container.get(config.repos.building.name);
    this.floorRepo = Container.get(config.repos.floor.name);
  }

  public async getElevator(buildingCode: string): Promise<Result<IElevatorDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      const elevator = building.elevator;
      if (!elevator) return Result.fail<IElevatorDTO>('Elevator not found');

      const elevatorDTO = ElevatorMap.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTO);
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(elevatorDTO.buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      const floors: Floor[] = [];

      for (const floorId of elevatorDTO.floorCodes) {
        const floor = await this.floorRepo.findByCode(floorId);
        if (!floor) return Result.fail<IElevatorDTO>('Floor not found');
        //if (floor.buildingCode !== building.code) return Result.fail<IElevatorDTO>('Floor not found in building');
        floors.push(floor);
      }

      const code = ElevatorCode.create(elevatorDTO.code).getValue();
      const branding =
        elevatorDTO.brand && elevatorDTO.model
          ? ElevatorBranding.create(elevatorDTO.brand, elevatorDTO.model).getValue()
          : undefined;
      const serialNumber = elevatorDTO.serialNumber
        ? ElevatorSerialNumber.create(elevatorDTO.serialNumber).getValue()
        : undefined;
      const description = elevatorDTO.description
        ? ElevatorDescription.create(elevatorDTO.description).getValue()
        : undefined;

      const elevatorOrError = Elevator.create({
        code,
        branding,
        serialNumber,
        description,
        floors
      });

      if (elevatorOrError.isFailure) return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());

      const elevatorResult = elevatorOrError.getValue();

      building.elevator = elevatorResult;

      try {
        await this.buildingRepo.save(building);

        const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
}
