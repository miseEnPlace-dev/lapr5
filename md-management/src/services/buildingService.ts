import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { BuildingMap } from '@/mappers/BuildingMap';
import Container, { Service } from 'typedi';
import config from '@/config.mjs';
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

  public async createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingOrError = Building.create(BuildingDTO);

      if (buildingOrError.isFailure) return Result.fail<IBuildingDTO>(buildingOrError.errorValue());

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const BuildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(BuildingDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
