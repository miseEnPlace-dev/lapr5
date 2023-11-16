import { Connector } from "@/model/Connector";

export interface IConnectorService {
  getConnectors(): Promise<Connector[]>;
  createConnector(connector: Connector): Promise<Connector>;
  getConnectorWithCode(code: string): Promise<Connector>;
}
