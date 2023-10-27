import config from '@/config.mjs';
import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingDescription } from '@/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '@/domain/building/buildingMaxDimensions';
import { BuildingName } from '@/domain/building/buildingName';
import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { BuildingMapper } from '@/mappers/BuildingMapper';
import Container, { Service } from 'typedi';
import { Result } from '../core/logic/Result';
import { Building } from '../domain/building/building';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';

@Service()
export default class BuildingService implements IBuildingService {
  private buildingRepo: IBuildingRepo;
  private floorRepo: IFloorRepo;
  constructor(buildingRepo?: IBuildingRepo, floorRepo?: IFloorRepo) {
    if (buildingRepo) this.buildingRepo = buildingRepo;
    else this.buildingRepo = Container.get(config.repos.building.name);
    if (floorRepo) this.floorRepo = floorRepo;
    else this.floorRepo = Container.get(config.repos.floor.name);
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
        buildingDTO.maxDimensions.length
      ).getValue();

      const buildingOrError = Building.create({
        code,
        name,
        description,
        maxDimensions
      });

      if (buildingOrError.isFailure) return Result.fail<IBuildingDTO>(buildingOrError.errorValue());

      const buildingResult = buildingOrError.getValue();

      if (await this.buildingRepo.findByCode(buildingResult.code))
        return Result.fail<IBuildingDTO>('Building already exists');

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMapper.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(
    buildingDTO: Partial<IBuildingDTO>,
    code: string
  ): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(code);
      if (!building) return Result.fail<IBuildingDTO>('Building not found');

      if (buildingDTO.name)
        building.name = buildingDTO.name
          ? BuildingName.create(buildingDTO.name).getValue()
          : undefined;

      if (buildingDTO.description)
        building.description = buildingDTO.description
          ? BuildingDescription.create(buildingDTO.description).getValue()
          : undefined;

      if (buildingDTO.maxDimensions)
        building.maxDimensions = BuildingMaxDimensions.create(
          buildingDTO.maxDimensions.width,
          buildingDTO.maxDimensions.length
        ).getValue();

      await this.buildingRepo.save(building);

      const buildingDTOResult = BuildingMapper.toDTO(building) as IBuildingDTO;
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
      const buildingCodes = await this.floorRepo.findBuildingCodesWithMinMaxFloors(min, max);
      const buildings: Building[] = [];
      for (const buildingCode of buildingCodes) {
        const building = await this.buildingRepo.findByDomainId(buildingCode);
        if (!building) throw new Error('Building not found');
        buildings.push(building);
      }
      const buildingsDTO = buildings.map(b => BuildingMapper.toDTO(b) as IBuildingDTO);
      return Result.ok<IBuildingDTO[]>(buildingsDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.buildingRepo.findAll();
      const buildingDTOs = buildings.map(b => BuildingMapper.toDTO(b) as IBuildingDTO);
      return Result.ok<IBuildingDTO[]>(buildingDTOs);
    } catch (e) {
      throw e;
    }
  }
}
