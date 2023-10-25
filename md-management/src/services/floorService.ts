import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { Result } from '@/core/logic/Result';
import { BuildingCode } from '@/domain/building/buildingCode';
import { Floor } from '@/domain/floor/floor';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDescription } from '@/domain/floor/floorDescription';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { FloorMap } from '@/mappers/FloorMap';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IFloorService from '@/services/IServices/IFloorService';
import IBuildingRepo from './IRepos/IBuildingRepo';

@Service()
export default class FloorService implements IFloorService {
  private floorRepo: IFloorRepo;
  private buildingRepo: IBuildingRepo;
  constructor() {
    this.floorRepo = Container.get(config.repos.floor.name);
    this.buildingRepo = Container.get(config.repos.building.name);
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByCode(floorDTO.code);
      if (!floor) return Result.fail<IFloorDTO>('Floor not found');

      const building = await this.buildingRepo.findByCode(floor.buildingCode.value);
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      if (
        !floorDTO.dimensions ||
        !floorDTO.dimensions.width ||
        !floorDTO.dimensions.height ||
        floorDTO.dimensions.width > building.maxDimensions.width ||
        floorDTO.dimensions.height > building.maxDimensions.height
      )
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const description = floorDTO.description
        ? FloorDescription.create(floorDTO.description)
        : undefined;

      const dimensions = floorDTO.dimensions
        ? FloorDimensions.create(floorDTO.dimensions.width, floorDTO.dimensions.height)
        : undefined;

      if (description) floor.description = description.getValue();
      if (dimensions) floor.dimensions = dimensions.getValue();

      await this.floorRepo.save(floor);

      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorDTO.code);

      if (code.isFailure) return Result.fail<IFloorDTO>(code.error as string);

      const description = floorDTO.description
        ? FloorDescription.create(floorDTO.description)
        : undefined;

      const building = await this.buildingRepo.findByCode(floorDTO.buildingCode);
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      const buildingCode = BuildingCode.create(floorDTO.buildingCode).getValue();

      if (
        !floorDTO.dimensions ||
        !floorDTO.dimensions.width ||
        !floorDTO.dimensions.height ||
        floorDTO.dimensions.width > building.maxDimensions.width ||
        floorDTO.dimensions.height > building.maxDimensions.height
      )
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const dimensions = FloorDimensions.create(
        floorDTO.dimensions.width,
        floorDTO.dimensions.height
      );

      if (dimensions.isFailure) return Result.fail<IFloorDTO>(dimensions.error);

      const floorOrError = Floor.create({
        code: code.getValue(),
        description: description ? description.getValue() : undefined,
        dimensions: dimensions.getValue(),
        buildingCode
      });

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>(floorOrError.error as string);

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllFloors(): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findAll();
      const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingFloors(buildingCode: BuildingCode): Promise<Result<IFloorDTO[]>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode.value);
      if (!building) return Result.fail<IFloorDTO[]>('Building not found');

      const floors = await this.floorRepo.findByBuildingId(building.id);
      const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsWithElevator(buildingCode: BuildingCode): Promise<Result<IFloorDTO[]>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode.value);
      if (!building) return Result.fail<IFloorDTO[]>('Building not found');

      const elevator = building.elevator;
      if (!elevator)
        return Result.fail<IFloorDTO[]>(
          'Elevator not found on this building. There are no floors served with elevator.'
        );

      const getFloorsWithBuildingCode = await this.floorRepo.findByBuildingId(building.id);

      const floorDTOs = getFloorsWithBuildingCode.map(floor => FloorMap.toDTO(floor));
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }
}
