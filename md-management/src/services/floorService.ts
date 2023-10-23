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

  public async createFloor(FloorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      console.log('FloorDTO:', FloorDTO); // Add this line to check the structure of FloorDTO

      const building = await this.buildingRepo.findByDomainId(FloorDTO.buildingCode);

      if (!building) return Result.fail<IFloorDTO>('Building does not exist');

      console.log('building:', building.maxDimensions); // Add this line to check the structure of building

      const floorCode = FloorCode.create(FloorDTO.code);

      if (floorCode.isFailure) return Result.fail<IFloorDTO>('Floor code is invalid');

      if (!FloorDTO.dimensions || !FloorDTO.dimensions.width || !FloorDTO.dimensions.height)
        return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const dimensions = FloorDimensions.create(
        FloorDTO.dimensions.width,
        FloorDTO.dimensions.height,
        building.maxDimensions.width,
        building.maxDimensions.height
      );

      if (dimensions.isFailure) return Result.fail<IFloorDTO>('Floor dimensions are invalid');

      const floorOrError = Floor.create({
        code: floorCode.getValue(),
        building: building,
        dimensions: dimensions.getValue()
      });

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>('Floor could not be created');

      const floorResult = floorOrError.getValue();

      console.log('floorResult:', floorResult); // Add this line to check the structure of floorResult

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
