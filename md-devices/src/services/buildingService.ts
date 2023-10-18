import { IBuildingDTO } from '@/dto/IBuildingDTO';
import { BuildingMap } from '@/mappers/BuildingMap';
import { Inject, Service } from 'typedi';
import config from '../../config.mjs';
import { Result } from '../core/logic/Result';
import { Building } from '../domain/building/building';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(@Inject(config.repos.building.name) private BuildingRepo: IBuildingRepo) {}
  public async createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const BuildingOrError = Building.create(BuildingDTO);

      if (BuildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(BuildingOrError.errorValue());
      }

      const BuildingResult = BuildingOrError.getValue();

      await this.BuildingRepo.save(BuildingResult);

      const BuildingDTOResult = BuildingMap.toDTO(BuildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(BuildingDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
