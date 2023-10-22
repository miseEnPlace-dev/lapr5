import Container, { Service } from 'typedi';

import config from '@/config.mjs';
import { Result } from '@/core/logic/Result';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import IFloorService from '@/services/IServices/IFloorService';
import { IFloorDTO } from '@/dto/IFloorDTO';
import { Floor } from '@/domain/floor/floor';
import { FloorMap } from '@/mappers/FloorMap';
import { BuildingCode } from '@/domain/building/buildingCode';

@Service()
export default class FloorService implements IFloorService {
  private floorRepo: IFloorRepo;
  constructor() {
    this.floorRepo = Container.get(config.repos.floor.name);
  }

  public async createFloor(FloorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floorOrError = Floor.create(FloorDTO);

      if (floorOrError.isFailure) return Result.fail<IFloorDTO>(floorOrError.errorValue());

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
}
