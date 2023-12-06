import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { Result } from '@/core/logic/Result';
import { IPaginationDTO } from '@/dto/IPaginationDTO';

export default interface IConnectorService {
  createConnector(connectorDTO: IConnectorDTO): Promise<Result<IConnectorDTO>>;
  checkConnectorExists(connectorDTO: IConnectorDTO): Promise<Result<boolean>>;
  getAllConnectors(page?: number, limit?: number): Promise<Result<IPaginationDTO<IConnectorDTO>>>;
  getConnectorByCode(code: string): Promise<Result<IConnectorDTO | null>>;
  getConnectorsBetweenBuildings(
    code1: string,
    code2: string,
    page?: number,
    limit?: number
  ): Promise<Result<IPaginationDTO<IConnectorDTO>>>;
  updateConnector(code: string, dto: Partial<IConnectorDTO>): Promise<Result<IConnectorDTO>>;
}
