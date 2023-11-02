import { TYPES } from '@/loaders/inversify/types';
import { inject, injectable } from 'inversify';

import { BuildingCode } from '@/domain/building/buildingCode';
import { BuildingDescription } from '@/domain/building/buildingDescription';
import { BuildingMaxDimensions } from '@/domain/building/buildingMaxDimensions';
import { BuildingName } from '@/domain/building/buildingName';
import { Building } from '../domain/building/building';

import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';

import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { BuildingMapper } from '@/mappers/BuildingMapper';
import { Result } from '../core/logic/Result';

@injectable()
export default class BuildingService implements IBuildingService {
  constructor(
    @inject(TYPES.buildingRepo) private buildingRepo: IBuildingRepo,
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo
  ) {}

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const codeOrError = BuildingCode.create(buildingDTO.code);
      if (codeOrError.isFailure) return Result.fail<IBuildingDTO>(codeOrError.errorValue());

      const nameOrError = buildingDTO.name ? BuildingName.create(buildingDTO.name) : undefined;
      if (nameOrError && nameOrError.isFailure)
        return Result.fail<IBuildingDTO>(nameOrError.errorValue());

      const descriptionOrError = buildingDTO.description
        ? BuildingDescription.create(buildingDTO.description)
        : undefined;
      if (descriptionOrError && descriptionOrError.isFailure)
        return Result.fail<IBuildingDTO>(descriptionOrError.errorValue());

      const maxDimensionsOrError = BuildingMaxDimensions.create(
        buildingDTO.maxDimensions.width,
        buildingDTO.maxDimensions.length
      );
      if (maxDimensionsOrError.isFailure)
        return Result.fail<IBuildingDTO>(maxDimensionsOrError.errorValue());

      const buildingOrError = Building.create({
        code: codeOrError.getValue(),
        name: nameOrError ? nameOrError.getValue() : undefined,
        description: descriptionOrError ? descriptionOrError.getValue() : undefined,
        maxDimensions: maxDimensionsOrError.getValue()
      });

      if (buildingOrError.isFailure) return Result.fail<IBuildingDTO>(buildingOrError.errorValue());

      const buildingResult = buildingOrError.getValue();

      const buildingExists = !!(await this.buildingRepo.findByCode(buildingResult.code));
      if (buildingExists) return Result.fail<IBuildingDTO>('Building already exists');

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
      const buildingCode = BuildingCode.create(code);
      if (buildingCode.isFailure) return Result.fail<IBuildingDTO>('Building not found');

      const building = await this.buildingRepo.findByCode(buildingCode.getValue());
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
