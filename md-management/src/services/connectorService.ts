import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IConnectorDTO } from '@/dto/IConnectorDTO';

import { Connector } from '@/domain/connector/connector';
import { ConnectorCode } from '@/domain/connector/connectorCode';
import { ConnectorMap } from '@/mappers/ConnectorMap';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IConnectorRepo from './IRepos/IConnectorRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IConnectorService from './IServices/IConnectorService';

@Service()
export default class ConnectorService implements IConnectorService {
  private connectorRepo: IConnectorRepo;
  private floorRepo: IFloorRepo;
  private buildingRepo: IBuildingRepo;

  constructor() {
    this.connectorRepo = Container.get(config.repos.connector.name);
    this.floorRepo = Container.get(config.repos.floor.name);
    this.buildingRepo = Container.get(config.repos.building.name);
  }

  public async checkConnectorExists(connectorDTO: IConnectorDTO): Promise<Result<boolean>> {
    try {
      const floor1 = await this.floorRepo.findByCode(connectorDTO.floor1Code);
      const floor2 = await this.floorRepo.findByCode(connectorDTO.floor2Code);
      if (!floor1 || !floor2) return Result.fail<boolean>('One/both floors do not exist');

      const connector = await this.connectorRepo.findConnectorBetweenFloors(floor1.id, floor2.id);

      return Result.ok<boolean>(!!connector);
    } catch (e) {
      throw e;
    }
  }

  public async createConnector(connectorDTO: IConnectorDTO): Promise<Result<IConnectorDTO>> {
    try {
      const code = ConnectorCode.create(connectorDTO.code).getValue();
      const floor1 = await this.floorRepo.findByCode(connectorDTO.floor1Code);
      const floor2 = await this.floorRepo.findByCode(connectorDTO.floor2Code);
      if (!floor1 || !floor2) return Result.fail<IConnectorDTO>('One/both floors do not exist');

      const connectorOrError = Connector.create({
        code,
        floor1,
        floor2
      });

      if (connectorOrError.isFailure)
        return Result.fail<IConnectorDTO>(connectorOrError.errorValue());

      const connectorResult = connectorOrError.getValue();

      await this.connectorRepo.save(connectorResult);

      const connectorDTOResult = ConnectorMap.toDTO(connectorResult) as IConnectorDTO;
      return Result.ok<IConnectorDTO>(connectorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getConnectorsBetweenBuildings(code1: string, code2: string) {
    try {
      const building1 = await this.buildingRepo.findByCode(code1);
      const building2 = await this.buildingRepo.findByCode(code2);
      if (!building1 || !building2)
        return Result.fail<IConnectorDTO[]>('One/both buildings do not exist');

      const floorsBuilding1 = await this.floorRepo.findByBuildingCode(building1.code);
      const floorsBuilding2 = await this.floorRepo.findByBuildingCode(building2.code);

      const ids1 = floorsBuilding1.map(floor => floor.id);
      const ids2 = floorsBuilding2.map(floor => floor.id);

      const connectors = await this.connectorRepo.findConnectorsBetweenFloors(ids1, ids2);

      const connectorsDTO = connectors.map(connector => ConnectorMap.toDTO(connector));

      return Result.ok<IConnectorDTO[]>(connectorsDTO);
    } catch (e) {
      throw e;
    }
  }
}
