import { Result } from '@/core/logic/Result';
import { Connector } from '@/domain/connector/connector';
import { ConnectorCode } from '@/domain/connector/connectorCode';
import { FloorCode } from '@/domain/floor/floorCode';
import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { ConnectorMapper } from '@/mappers/ConnectorMapper';
import { inject, injectable } from 'inversify';
import { TYPES } from '../loaders/inversify/types';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IConnectorRepo from './IRepos/IConnectorRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IConnectorService from './IServices/IConnectorService';

@injectable()
export default class ConnectorService implements IConnectorService {
  constructor(
    @inject(TYPES.connectorRepo) private connectorRepo: IConnectorRepo,
    @inject(TYPES.floorRepo) private floorRepo: IFloorRepo,
    @inject(TYPES.buildingRepo) private buildingRepo: IBuildingRepo
  ) {}

  public async checkConnectorExists(connectorDTO: IConnectorDTO): Promise<Result<boolean>> {
    try {
      const code1 = ConnectorCode.create(connectorDTO.floor1Code).getValue();
      const code2 = ConnectorCode.create(connectorDTO.floor2Code).getValue();
      const floor1 = await this.floorRepo.findByCode(code1);
      const floor2 = await this.floorRepo.findByCode(code2);
      if (!floor1 || !floor2) return Result.fail<boolean>('One/both floors do not exist');

      const connector = await this.connectorRepo.findBetweenFloors(floor1.id, floor2.id);

      return Result.ok<boolean>(!!connector);
    } catch (e) {
      throw e;
    }
  }

  public async createConnector(connectorDTO: IConnectorDTO): Promise<Result<IConnectorDTO>> {
    try {
      const codeOrError = ConnectorCode.create(connectorDTO.code);
      if (codeOrError.isFailure) return Result.fail<IConnectorDTO>(codeOrError.errorValue());

      const floorCode1OrError = FloorCode.create(connectorDTO.floor1Code);
      if (floorCode1OrError.isFailure)
        return Result.fail<IConnectorDTO>(floorCode1OrError.errorValue());

      const floorCode2OrError = FloorCode.create(connectorDTO.floor2Code);
      if (floorCode2OrError.isFailure)
        return Result.fail<IConnectorDTO>(floorCode2OrError.errorValue());

      const floor1 = await this.floorRepo.findByCode(floorCode1OrError.getValue());
      const floor2 = await this.floorRepo.findByCode(floorCode2OrError.getValue());
      if (!floor1 || !floor2) return Result.fail<IConnectorDTO>('One/both floors do not exist');
      if (floor1.equals(floor2)) return Result.fail<IConnectorDTO>('Floors cannot be the same');
      if (floor1.buildingCode.equals(floor2.buildingCode))
        return Result.fail<IConnectorDTO>('Floors must be in different buildings');

      const exists = await this.connectorRepo.findBetweenFloors(floor1.id, floor2.id);

      if (exists)
        return Result.fail<IConnectorDTO>('Connector between those floors already exists');

      const connectorOrError = Connector.create({
        code: codeOrError.getValue(),
        floor1,
        floor2
      });

      if (connectorOrError.isFailure)
        return Result.fail<IConnectorDTO>(connectorOrError.errorValue());

      const connectorResult = connectorOrError.getValue();

      await this.connectorRepo.save(connectorResult);

      const connectorDTOResult = ConnectorMapper.toDTO(connectorResult) as IConnectorDTO;
      return Result.ok<IConnectorDTO>(connectorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllConnectors() {
    try {
      const connectors = await this.connectorRepo.findAll();
      const connectorsDTO = connectors.map(connector => ConnectorMapper.toDTO(connector));

      return Result.ok<IConnectorDTO[]>(connectorsDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getConnectorByCode(codeStr: string) {
    try {
      const code = ConnectorCode.create(codeStr).getValue();
      const connector = await this.connectorRepo.findByCode(code);

      if (!connector) return Result.fail<IConnectorDTO>('Connector not found');

      const dto = ConnectorMapper.toDTO(connector);

      return Result.ok<IConnectorDTO>(dto);
    } catch (e) {
      throw e;
    }
  }

  public async getConnectorsBetweenBuildings(code1: string, code2: string) {
    try {
      const buildingCode1 = ConnectorCode.create(code1).getValue();
      const buildingCode2 = ConnectorCode.create(code2).getValue();
      const building1 = await this.buildingRepo.findByCode(buildingCode1);
      const building2 = await this.buildingRepo.findByCode(buildingCode2);
      if (!building1 || !building2)
        return Result.fail<IConnectorDTO[]>('One/both buildings do not exist');

      const floorsBuilding1 = await this.floorRepo.findByBuildingCode(building1.code);
      const floorsBuilding2 = await this.floorRepo.findByBuildingCode(building2.code);

      const ids1 = floorsBuilding1.map(floor => floor.id);
      const ids2 = floorsBuilding2.map(floor => floor.id);

      const connectors = await this.connectorRepo.findBetweenMultipleFloors(ids1, ids2);

      const connectorsDTO = connectors.map(connector => ConnectorMapper.toDTO(connector));

      return Result.ok<IConnectorDTO[]>(connectorsDTO);
    } catch (e) {
      throw e;
    }
  }

  public async updateConnector(rawCode: string, dto: Partial<IConnectorDTO>) {
    try {
      const code = ConnectorCode.create(rawCode).getValue();
      const connector = await this.connectorRepo.findByCode(code);
      if (!connector) return Result.fail<IConnectorDTO>('Connector w/ given code does not exist');

      if (!dto.floor1Code && !dto.floor2Code)
        return Result.fail<IConnectorDTO>('Nothing to update');

      const floorCode1 = dto.floor1Code
        ? FloorCode.create(dto.floor1Code as string).getValue()
        : undefined;
      const floorCode2 = dto.floor2Code
        ? FloorCode.create(dto.floor2Code as string).getValue()
        : undefined;

      const floor1 = floorCode1 ? await this.floorRepo.findByCode(floorCode1) : connector.floor1;
      const floor2 = floorCode2 ? await this.floorRepo.findByCode(floorCode2) : connector.floor2;

      if (!floor1 || !floor2) return Result.fail<IConnectorDTO>('One/both floors do not exist');
      if (floor1.equals(floor2)) return Result.fail<IConnectorDTO>('Floors cannot be the same');
      if (floor1.buildingCode.equals(floor2.buildingCode))
        return Result.fail<IConnectorDTO>('Floors must be in different buildings');

      const exists = await this.connectorRepo.findBetweenFloors(floor1.id, floor2.id);

      if (exists)
        return Result.fail<IConnectorDTO>('Connector between those floors already exists');

      const connectorOrError = Connector.create(
        {
          code,
          floor1,
          floor2
        },
        connector.id
      );

      if (connectorOrError.isFailure)
        return Result.fail<IConnectorDTO>(connectorOrError.errorValue());

      const updated = await this.connectorRepo.save(connectorOrError.getValue());

      return Result.ok<IConnectorDTO>(ConnectorMapper.toDTO(updated));
    } catch (e) {
      throw e;
    }
  }
}
