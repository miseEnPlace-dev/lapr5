import { IConnectorDTO } from '@/dto/IConnectorDTO';
import { Result } from '@/core/logic/Result';

export default interface IConnectorService {
  createConnector(connectorDTO: IConnectorDTO): Promise<Result<IConnectorDTO>>;
}
