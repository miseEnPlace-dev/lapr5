import { Connector } from "@/model/Connector";

export interface IConnectorService {
  getConnectors(buildingCodes?: string[]): Promise<Connector[]>;
  getConnectorWithCode(code: string): Promise<Connector>;
  createConnector(connector: Connector): Promise<Connector>;
  updateConnector(connector: Connector): Promise<Connector>;
}
