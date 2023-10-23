import config from '@/config.mjs';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingDescription } from '@/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '@/domain/building/buildingMaxDimensions';
import { BuildingName } from '@/domain/building/buildingName';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { BuildingMap } from '@/mappers/BuildingMap';
import Container, { Service } from 'typedi';
import { Result } from '../core/logic/Result';
import { Building } from '../domain/building/building';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';

@Service()
export default class BuildingService implements IBuildingService {
  private buildingRepo: IBuildingRepo;
  constructor() {
    this.buildingRepo = Container.get(config.repos.building.name);
  }

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const code = BuildingCode.create(buildingDTO.code).getValue();
      const name = buildingDTO.name ? BuildingName.create(buildingDTO.name).getValue() : undefined;
      const description = buildingDTO.description
        ? BuildingDescription.create(buildingDTO.description).getValue()
        : undefined;
      const maxDimensions = BuildingMaxDimensions.create(
        buildingDTO.maxDimensions.width,
        buildingDTO.maxDimensions.height
      ).getValue();

      const buildingOrError = Building.create({
        code,
        name,
        description,
        maxDimensions
      });

      if (buildingOrError.isFailure) return Result.fail<IBuildingDTO>(buildingOrError.errorValue());

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingsWithMinMaxFloors(
    min: number,
    max: number
  ): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.buildingRepo.findWithMinMaxFloors(min, max);
      const buildingsDTO = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);
      return Result.ok<IBuildingDTO[]>(buildingsDTO);
    } catch (e) {
      throw e;
    }
  }
}
