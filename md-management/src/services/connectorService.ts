import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { Result } from '@/core/logic/Result';
import { IConnectorDTO } from '@/dto/IConnectorDTO';

import IConnectorRepo from './IRepos/IConnectorRepo';
import IConnectorService from './IServices/IConnectorService';
import IFloorRepo from './IRepos/IFloorRepo';
import { Connector } from '@/domain/connector/connector';
import { ConnectorMap } from '@/mappers/ConnectorMap';
import { ConnectorCode } from '@/domain/connector/connectorCode';

@Service()
export default class ConnectorService implements IConnectorService {
  private connectorRepo: IConnectorRepo;
  private floorRepo: IFloorRepo;

  constructor() {
    this.connectorRepo = Container.get(config.repos.connector.name);
    this.floorRepo = Container.get(config.repos.floor.name);
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
}
