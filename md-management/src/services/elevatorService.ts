import { BuildingCode } from '@/domain/building/buildingCode';
import { ElevatorBranding } from '@/domain/elevator/elevatorBranding';
import { ElevatorCode } from '@/domain/elevator/elevatorCode';
import { ElevatorDescription } from '@/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '@/domain/elevator/elevatorSerialNumber';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import { TYPES } from '@/loaders/inversify/types';
import { ElevatorMapper } from '@/mappers/ElevatorMapper';
import { inject, injectable } from 'inversify';
import { Result } from '../core/logic/Result';
import { Elevator } from '../domain/elevator/elevator';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IElevatorService from './IServices/IElevatorService';

@injectable()
export default class ElevatorService implements IElevatorService {
  constructor(
    @inject(TYPES.buildingRepo) private buildingRepo: IBuildingRepo,
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo
  ) {}

  public async getElevatorForBuilding(
    buildingCode: string
  ): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>> {
    try {
      const codeOrError = BuildingCode.create(buildingCode);
      if (codeOrError.isFailure) return Result.fail<IElevatorDTO>(codeOrError.errorValue());

      const code = codeOrError.getValue();
      const building = await this.buildingRepo.findByCode(code);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      const elevator = building.elevator;
      if (!elevator) return Result.fail<IElevatorDTO>('Elevator not found');

      const elevatorDTO = ElevatorMapper.toDTO(elevator);
      return Result.ok<Omit<IElevatorDTO, 'buildingCode'>>(elevatorDTO);
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(
    elevatorDTO: IElevatorDTO
  ): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>> {
    try {
      const buildingCodeOrError = BuildingCode.create(elevatorDTO.buildingCode);
      if (buildingCodeOrError.isFailure)
        return Result.fail<IElevatorDTO>(buildingCodeOrError.errorValue());
      const buildingCode = buildingCodeOrError.getValue();

      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      if (building.elevator) return Result.fail<IElevatorDTO>('Elevator already exists');

      const floors: Floor[] = [];

      for (const floorId of elevatorDTO.floorCodes) {
        const floorCodeOrError = FloorCode.create(floorId);
        if (floorCodeOrError.isFailure)
          return Result.fail<IElevatorDTO>(floorCodeOrError.errorValue());
        const code = floorCodeOrError.getValue();

        const floor = await this.floorRepo.findByCode(code);
        if (!floor) return Result.fail<IElevatorDTO>('Floor not found');
        if (floor.buildingCode !== building.code)
          return Result.fail<IElevatorDTO>('Floor not found in building');

        floors.push(floor);
      }

      const codeOrError = ElevatorCode.create(elevatorDTO.code);
      if (codeOrError.isFailure) return Result.fail<IElevatorDTO>(codeOrError.errorValue());
      const code = codeOrError.getValue();

      const brandingOrError =
        elevatorDTO.brand && elevatorDTO.model
          ? ElevatorBranding.create(elevatorDTO.brand, elevatorDTO.model)
          : undefined;
      if (brandingOrError && brandingOrError.isFailure)
        return Result.fail<IElevatorDTO>(brandingOrError.errorValue());
      const branding = brandingOrError ? brandingOrError.getValue() : undefined;

      const serialNumberOrError = elevatorDTO.serialNumber
        ? ElevatorSerialNumber.create(elevatorDTO.serialNumber)
        : undefined;
      if (serialNumberOrError && serialNumberOrError.isFailure)
        return Result.fail<IElevatorDTO>(serialNumberOrError.errorValue());
      const serialNumber = serialNumberOrError ? serialNumberOrError.getValue() : undefined;

      const descriptionOrError = elevatorDTO.description
        ? ElevatorDescription.create(elevatorDTO.description)
        : undefined;
      if (descriptionOrError && descriptionOrError.isFailure)
        return Result.fail<IElevatorDTO>(descriptionOrError.errorValue());
      const description = descriptionOrError ? descriptionOrError.getValue() : undefined;

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

      await this.buildingRepo.save(building);

      const elevatorDTOResult = ElevatorMapper.toDTO(elevatorResult);
      return Result.ok<Omit<IElevatorDTO, 'buildingCode'>>(elevatorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async editElevator(
    elevatorDTO: Partial<IElevatorDTO>
  ): Promise<Result<Omit<IElevatorDTO, 'buildingCode'>>> {
    try {
      if (!elevatorDTO.buildingCode) return Result.fail<IElevatorDTO>('Elevator code not provided');

      const buildingCodeOrError = BuildingCode.create(elevatorDTO.buildingCode);
      if (buildingCodeOrError.isFailure)
        return Result.fail<IElevatorDTO>(buildingCodeOrError.errorValue());
      const buildingCode = buildingCodeOrError.getValue();

      const building = await this.buildingRepo.findByCode(buildingCode);
      if (!building) return Result.fail<IElevatorDTO>('Building not found');

      if (!building.elevator) return Result.fail<IElevatorDTO>('Elevator not found');
      const floors: Floor[] = [];

      if (elevatorDTO.floorCodes) {
        for (const floorId of elevatorDTO.floorCodes) {
          const codeOrError = FloorCode.create(floorId);
          if (codeOrError.isFailure) return Result.fail<IElevatorDTO>(codeOrError.errorValue());
          const code = codeOrError.getValue();

          const floor = await this.floorRepo.findByCode(code);
          if (!floor) return Result.fail<IElevatorDTO>('Floor not found');
          if (floor.buildingCode !== building.code)
            return Result.fail<IElevatorDTO>('Floor not found in building');

          floors.push(floor);
        }
      } else for (const floor of building.elevator.floors) floors.push(floor);

      const codeOrError = elevatorDTO.code
        ? ElevatorCode.create(elevatorDTO.code)
        : building.elevator.code;
      if (codeOrError instanceof Result && codeOrError.isFailure)
        return Result.fail<IElevatorDTO>(codeOrError.errorValue());
      const code = codeOrError instanceof Result ? codeOrError.getValue() : codeOrError;

      const brandingOrError =
        elevatorDTO.brand && elevatorDTO.model
          ? ElevatorBranding.create(elevatorDTO.brand, elevatorDTO.model)
          : building.elevator.brand && building.elevator.model
          ? ElevatorBranding.create(building.elevator?.brand, building.elevator?.model)
          : undefined;
      if (brandingOrError instanceof Result && brandingOrError.isFailure)
        return Result.fail<IElevatorDTO>(brandingOrError.errorValue());
      const branding = brandingOrError instanceof Result ? brandingOrError.getValue() : undefined;

      const serialNumberOrError = elevatorDTO.serialNumber
        ? ElevatorSerialNumber.create(elevatorDTO.serialNumber)
        : building.elevator.serialNumber;
      if (serialNumberOrError instanceof Result && serialNumberOrError.isFailure)
        return Result.fail<IElevatorDTO>(serialNumberOrError.errorValue());
      const serialNumber =
        serialNumberOrError instanceof Result ? serialNumberOrError.getValue() : undefined;

      const descriptionOrError = elevatorDTO.description
        ? ElevatorDescription.create(elevatorDTO.description)
        : building.elevator.description;
      if (descriptionOrError instanceof Result && descriptionOrError.isFailure)
        return Result.fail<IElevatorDTO>(descriptionOrError.errorValue());
      const description =
        descriptionOrError instanceof Result ? descriptionOrError.getValue() : undefined;

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

        const elevatorDTOResult = ElevatorMapper.toDTO(elevatorResult);
        return Result.ok<Omit<IElevatorDTO, 'buildingCode'>>(elevatorDTOResult);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
}
