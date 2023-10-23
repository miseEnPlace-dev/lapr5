import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { Result } from '@/core/logic/Result';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IFloorService from '@/services/IServices/IFloorService';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { Floor } from '@/domain/floor/floor';
import { FloorMap } from '@/mappers/FloorMap';
import { BuildingCode } from '@/domain/building/buildingCode';
import { FloorCode } from '@/domain/floor/floorCode';
import { FloorDimensions } from '@/domain/floor/floorDimensions';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { FloorDescription } from '@/domain/floor/floorDescription';

@Service()
export default class FloorService implements IFloorService {
  private floorRepo: IFloorRepo;
  private buildingRepo: IBuildingRepo;
  constructor() {
    this.floorRepo = Container.get(config.repos.floor.name);
    this.buildingRepo = Container.get(config.repos.building.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    throw new Error('Method not implemented.');
  }

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const code = FloorCode.create(floorDTO.code).getValue();
      const description = floorDTO.description
        ? FloorDescription.create(floorDTO.description).getValue()
        : undefined;

      const building = await this.buildingRepo.findByDomainId(floorDTO.buildingCode);
      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      if (!floorDTO.dimensions || !floorDTO.dimensions.width || !floorDTO.dimensions.height)
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const dimensions = FloorDimensions.create(
        floorDTO.dimensions.width,
        floorDTO.dimensions.height,
        building.maxDimensions.width,
        building.maxDimensions.height
      );

      if (dimensions.isFailure) return Result.fail<IFloorDTO>(dimensions.error as string);

      const floorOrError = Floor.create({
        code,
        description,
        dimensions: dimensions.getValue(),
        building: building
      });

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>(floorOrError.error as string);

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const FloorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(FloorDTOResult);
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

  public async getBuildingFloors(buildingId: BuildingCode): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findByBuildingId(buildingId);
      const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsWithElevator(buildingId: BuildingCode): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findByBuildingIdWithElevator(buildingId);
      const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
  }
}
