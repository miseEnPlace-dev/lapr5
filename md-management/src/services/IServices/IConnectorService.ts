import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { Result } from '@/core/logic/Result';

export default interface IConnectorService {
  createConnector(connectorDTO: IConnectorDTO): Promise<Result<IConnectorDTO>>;
  checkConnectorExists(connectorDTO: IConnectorDTO): Promise<Result<boolean>>;
  getAllConnectors(): Promise<Result<IConnectorDTO[]>>;
  getConnectorsBetweenBuildings(code1: string, code2: string): Promise<Result<IConnectorDTO[]>>;
  updateConnector(code: string, dto: Partial<IConnectorDTO>): Promise<Result<IConnectorDTO>>;
}
