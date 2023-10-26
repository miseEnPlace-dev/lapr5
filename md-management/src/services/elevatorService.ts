import config from '@/config.mjs';
import { ElevatorBranding } from '@/domain/elevator/elevatorBranding';
import { ElevatorCode } from '@/domain/elevator/elevatorCode';
import { ElevatorDescription } from '@/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '@/domain/elevator/elevatorSerialNumber';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { ElevatorMapper } from '@/mappers/ElevatorMapper';
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

  public async getElevatorForBuilding(buildingCode: string): Promise<Result<IElevatorDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      const elevator = building.elevator;
      if (!elevator) return Result.fail<IElevatorDTO>('Elevator not found');

      const elevatorDTO = ElevatorMapper.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTO);
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(elevatorDTO.buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      if (building.elevator) return Result.fail<IElevatorDTO>('Elevator already exists');

      const floors: Floor[] = [];

      for (const floorId of elevatorDTO.floorCodes) {
        const code = FloorCode.create(floorId).getValue();
        const floor = await this.floorRepo.findByCode(code);
        if (!floor) return Result.fail<IElevatorDTO>('Floor not found');
        if (!floor.buildingCode.equals(building.code))
          return Result.fail<IElevatorDTO>('Floor not found in building');
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

        const elevatorDTOResult = ElevatorMapper.toDTO(elevatorResult) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }

  public async editElevator(elevatorDTO: Partial<IElevatorDTO>): Promise<Result<IElevatorDTO>> {
    try {
      if (!elevatorDTO.buildingCode) return Result.fail<IElevatorDTO>('Elevator code not provided');

      const building = await this.buildingRepo.findByCode(elevatorDTO.buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      if (!building.elevator) return Result.fail<IElevatorDTO>('Elevator not found');
      const floors: Floor[] = [];

      if (elevatorDTO.floorCodes) {
        for (const floorId of elevatorDTO.floorCodes) {
          const code = FloorCode.create(floorId).getValue();
          const floor = await this.floorRepo.findByCode(code);
          if (!floor) return Result.fail<IElevatorDTO>('Floor not found');
          if (!floor.buildingCode.equals(building.code))
            return Result.fail<IElevatorDTO>('Floor not found in building');
          floors.push(floor);
        }
      } else {
        for (const floor of building.elevator.floors) floors.push(floor);
      }

      const code = elevatorDTO.code
        ? ElevatorCode.create(elevatorDTO.code).getValue()
        : building.elevator.code;
      const branding =
        elevatorDTO.brand && elevatorDTO.model
          ? ElevatorBranding.create(elevatorDTO.brand, elevatorDTO.model).getValue()
          : building.elevator.brand && building.elevator.model
          ? ElevatorBranding.create(building.elevator.brand, building.elevator.model).getValue()
          : undefined;
      const serialNumber = elevatorDTO.serialNumber
        ? ElevatorSerialNumber.create(elevatorDTO.serialNumber).getValue()
        : building.elevator.serialNumber;
      const description = elevatorDTO.description
        ? ElevatorDescription.create(elevatorDTO.description).getValue()
        : building.elevator.description;

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

        const elevatorDTOResult = ElevatorMapper.toDTO(elevatorResult) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
}
