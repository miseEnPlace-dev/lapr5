import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Connector } from "@/model/Connector";

export interface IConnectorService {
  getConnectors(
    buildingCodes?: string[],
    page?: number,
    count?: number
  ): Promise<IPaginationDTO<Connector>>;
  getConnectorWithCode(code: string): Promise<Connector>;
  createConnector(connector: Connector): Promise<Connector>;
  updateConnector(connector: Connector): Promise<Connector>;
}
